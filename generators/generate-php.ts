#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// --- Configuration ---
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, '../dtos'),
  enums: path.resolve(__dirname, '../enums')
};

const OUTPUT_DIR = path.resolve(__dirname, '../generated/php');
const ROOT_NAMESPACE = 'Hoster\\Contracts';

// --- ANSI colors for console output ---
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// --- Stats tracking ---
const stats = {
  processed: 0,
  successful: 0,
  failed: 0
};

// --- Type mapping from TypeScript to PHP ---
const typeMapping: Record<string, string> = {
  'string': 'string',
  'number': 'float', // Or int|float, float is safer for general numbers
  'boolean': 'bool',
  'any': 'mixed',
  'Date': '\\DateTime',
  'object': 'array',
  'string[]': 'array',
  'number[]': 'array',
  'boolean[]': 'array',
};

// --- Helper Functions ---

async function findFiles(pattern: string): Promise<string[]> {
  try {
    return await glob(pattern, { nodir: true });
  } catch (error) {
    console.error(`Error finding files with pattern ${pattern}: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

async function setupDirectories() {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.ensureDir(path.join(OUTPUT_DIR, 'dtos'));
  await fs.ensureDir(path.join(OUTPUT_DIR, 'enums'));
}

function convertType(tsType: string): { phpType: string, docType: string | null } {
  let isOptional = false;
  if (tsType.endsWith('?')) {
    isOptional = true;
    tsType = tsType.slice(0, -1);
  }

  // Handle union types like 'string | null' or 'number | null'
  if (tsType.includes('|')) {
      const types = tsType.split('|').map(t => t.trim());
      const hasNull = types.includes('null');
      const nonNullTypes = types.filter(t => t !== 'null');
      const phpTypes = nonNullTypes.map(t => convertType(t).phpType);
      const uniquePhpTypes = [...new Set(phpTypes)];
      
      // For PHP 8.0+, use type1|type2|null syntax instead of ?type1|type2
      if (hasNull || isOptional) {
          // If it has null or is optional, add null to the union type
          const finalType = [...uniquePhpTypes, 'null'].join('|');
          return { phpType: finalType, docType: null };
      } else {
          const finalType = uniquePhpTypes.join('|');
          return { phpType: finalType, docType: null };
      }
  }

  // Handle array types like 'MyType[]'
  if (tsType.endsWith('[]')) {
    const baseType = tsType.slice(0, -2);
    const convertedBase = convertType(baseType);
    const docType = `${convertedBase.phpType}[]`;
    return { phpType: isOptional ? '?array' : 'array', docType };
  }
  
  // Handle generic types like Array<MyType> or Record<string, MyType>
  const genericMatch = tsType.match(/(\w+)<(.+)>/);
  if (genericMatch) {
      const container = genericMatch[1];
      const inner = genericMatch[2];
      if (container === 'Array') {
          const innerConverted = convertType(inner);
          return { phpType: isOptional ? '?array' : 'array', docType: `${innerConverted.phpType}[]` };
      }
      if (container === 'Record') {
          const [key, value] = inner.split(',').map(t => t.trim());
          const keyConverted = convertType(key);
          const valueConverted = convertType(value);
          return { phpType: isOptional ? '?array' : 'array', docType: `array<${keyConverted.phpType}, ${valueConverted.phpType}>` };
      }
  }

  const mappedType = typeMapping[tsType] || tsType;
  return { phpType: isOptional ? `?${mappedType}` : mappedType, docType: null };
}

function extractFields(content: string): Array<{ name: string, type: string, defaultValue: string | null, comment: string }> {
    // First, remove all decorators to avoid interference with field extraction
    const contentWithoutDecorators = content.replace(/@\w+(?:\([^)]*\))?/g, '');
    
    const fields: Array<{ name: string, type: string, defaultValue: string | null, comment: string }> = [];
    const fieldRegex = /(?:(\/\*\*[\s\S]*?\*\/)\s*)?(public\s+|readonly\s+)?(\w+\??):\s*([^;=\n]+)(?:\s*=\s*([^;]+))?/g;
    let match;
    
    while ((match = fieldRegex.exec(contentWithoutDecorators)) !== null) {
        const [fullMatch, commentBlock, modifier, name, type, defaultValue] = match;
        
        if (name && type) {
            // Extract comments from comment blocks
            const comment = commentBlock ? 
                commentBlock.replace(/\/\*\*|\*\/|\*/g, '').split('\n').map(l => l.trim()).filter(Boolean).join(' ') :
                '';

            // Extract field information
            fields.push({
                name: name.replace('?', ''),
                type: `${type.trim()}${name.endsWith('?') ? '?' : ''}`,
                defaultValue: defaultValue ? defaultValue.trim() : null,
                comment: comment
            });
        }
    }
    return fields;
}

function extractEnumValues(content: string): Array<{ name: string, value: string }> {
    const values: Array<{ name: string, value: string }> = [];
    const enumRegex = /(\w+)\s*=\s*([`"']\w+[`"']|\d+)/g;
    let match;
    while ((match = enumRegex.exec(content)) !== null) {
        values.push({ name: match[1], value: match[2].replace(/[`"']/g, '') });
    }
    return values;
}

function generatePhpClass(name: string, content: string, namespace: string): string {
    const fields = extractFields(content);
    const usedTypes = new Set<string>();
    
    // First, extract all imports from the TypeScript file
    const imports = extractImports(content);
    
    // Create a map of type names to their import paths for quick lookup
    const typeImportMap = new Map<string, string>();
    imports.forEach(imp => {
        typeImportMap.set(imp.name, imp.path);
    });
    
    // Helper function to add used type with proper namespace
    const addUsedType = (typeName: string) => {
        // Skip null and built-in types
        if (typeName === 'null' || isBuiltInType(typeName)) {
            return;
        }
        
        // Check if we have an import for this type
        const importPath = typeImportMap.get(typeName);
        if (importPath) {
            // Determine namespace based on import path
            if (importPath.includes('/enums/')) {
                usedTypes.add(`${ROOT_NAMESPACE}\\Enums\\${typeName}`);
            } else if (importPath.includes('/dtos/') || importPath.includes('/dto/')) {
                // Handle DTOs in subfolders
                if (importPath.includes('/sender/')) {
                    usedTypes.add(`${ROOT_NAMESPACE}\\Dtos\\Sender\\${typeName}`);
                } else if (importPath.includes('/receiver/')) {
                    usedTypes.add(`${ROOT_NAMESPACE}\\Dtos\\Receiver\\${typeName}`);
                } else if (importPath.includes('/info/')) {
                    usedTypes.add(`${ROOT_NAMESPACE}\\Dtos\\Info\\${typeName}`);
                } else {
                    usedTypes.add(`${ROOT_NAMESPACE}\\Dtos\\${typeName}`);
                }
            }
        } else {
            // If no explicit import found, try to infer the namespace
            if (typeName.endsWith('Dto')) {
                // Try to infer subfolder from naming convention
                if (typeName.startsWith('Email') || typeName.startsWith('Sms') || typeName.startsWith('Push')) {
                    if (typeName.includes('Sender')) {
                        usedTypes.add(`${ROOT_NAMESPACE}\\Dtos\\Sender\\${typeName}`);
                    } else if (typeName.includes('Receiver')) {
                        usedTypes.add(`${ROOT_NAMESPACE}\\Dtos\\Receiver\\${typeName}`);
                    } else {
                        usedTypes.add(`${ROOT_NAMESPACE}\\Dtos\\${typeName}`);
                    }
                } else if (typeName.includes('Info')) {
                    usedTypes.add(`${ROOT_NAMESPACE}\\Dtos\\Info\\${typeName}`);
                } else {
                    usedTypes.add(`${ROOT_NAMESPACE}\\Dtos\\${typeName}`);
                }
            } else if (typeName.endsWith('Enum')) {
                usedTypes.add(`${ROOT_NAMESPACE}\\Enums\\${typeName}`);
            }
        }
    };
    
    // Process all fields to collect used types
    fields.forEach(field => {
        const { phpType } = convertType(field.type);
        
        // Handle built-in PHP types with namespace
        if (phpType.includes('\\')) {
            usedTypes.add(phpType.replace('?', ''));
            return;
        }
        
        // Handle union types (e.g., Type1|Type2|null)
        if (phpType.includes('|')) {
            const types = phpType.split('|').map(t => t.trim());
            types.forEach(type => addUsedType(type));
        } else {
            // Handle single type
            const baseType = phpType.replace('?', '').replace('[]', '');
            if (!isBuiltInType(baseType) && !baseType.includes('\\')) {
                addUsedType(baseType);
            }
        }
    });
    
    // Manually analyze field types for union types
    fields.forEach(field => {
        // Look for union types in the field type
        if (field.type.includes('|')) {
            // Extract type names from the union type
            const typeNames = field.type.split('|').map(t => t.trim());
            typeNames.forEach(typeName => {
                // Remove optional marker and array notation
                const cleanTypeName = typeName.replace('?', '').replace('[]', '');
                // Check if this is a custom type (not built-in)
                if (!isBuiltInType(cleanTypeName) && cleanTypeName !== 'null') {
                    addUsedType(cleanTypeName);
                }
            });
        }
        
        // Also check for array types like Type[] which might be DTOs
        if (field.type.includes('[]')) {
            const baseType = field.type.replace('[]', '').replace('?', '');
            if (!isBuiltInType(baseType) && baseType !== 'null') {
                addUsedType(baseType);
            }
        }
    });
    
    // Also look for union types directly in the content
    const unionTypeRegex = /:\s*([A-Za-z0-9_]+)\s*\|\s*([A-Za-z0-9_]+)\s*\|\s*([A-Za-z0-9_]+)/g;
    let match;
    while ((match = unionTypeRegex.exec(content)) !== null) {
        for (let i = 1; i < match.length; i++) {
            const type = match[i];
            if (type && !isBuiltInType(type) && type !== 'null') {
                addUsedType(type);
            }
        }
    }
    
    // Generate property strings
    const properties = fields.map(field => {
        const { phpType, docType } = convertType(field.type);

        let propertyString = ``;
        if (field.comment || docType) {
            propertyString += `    /**\n`;
            if (field.comment) propertyString += `     * @var ${field.comment}\n`;
            if (docType) propertyString += `     * @var ${docType}\n`;
            propertyString += `     */\n`;
        }
        
        propertyString += `    public ${phpType} $${field.name}`;
        
        if (field.defaultValue) {
            propertyString += ` = ${field.defaultValue}`;
        }
        
        return propertyString + ';';
    }).join('\n\n');

    // Generate use statements for all collected types
    let useStatements = '';
    if (usedTypes.size > 0) {
        useStatements = [...usedTypes].map(type => `use ${type};`).join('\n') + '\n\n';
    }

    return `<?php declare(strict_types=1);

namespace ${namespace};

${useStatements}class ${name} 
{
${properties}
}
`;
}

function generatePhpEnum(name: string, content: string, namespace: string): string {
    const values = extractEnumValues(content);
    if (values.length === 0) return '';

    const isStringBacked = isNaN(parseInt(values[0].value, 10));
    const backingType = isStringBacked ? 'string' : 'int';

    const cases = values.map(v => `    case ${v.name} = ${isStringBacked ? `'${v.value}'` : v.value};`).join('\n');

    return `<?php declare(strict_types=1);

namespace ${namespace};

enum ${name}: ${backingType}
{
${cases}
}
`;
}


// Helper function to check if a type is a built-in PHP type
function isBuiltInType(type: string): boolean {
    const builtInTypes = ['string', 'int', 'float', 'bool', 'array', 'mixed', 'object', 'void', 'null', 'callable', 'iterable', 'resource'];
    return builtInTypes.includes(type.toLowerCase());
}

// Extract imports from TypeScript content
function extractImports(content: string): Array<{ name: string, path: string }> {
    const imports: Array<{ name: string, path: string }> = [];
    const importRegex = /import\s+(?:{\s*([^}]+)\s*}|([^\s;]+))\s+from\s+['"]([^'"]+)['"];/g;
    
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const [_, namedImports, defaultImport, path] = match;
        
        if (namedImports) {
            // Handle named imports like: import { Type1, Type2 } from './path'
            const names = namedImports.split(',').map(name => name.trim().split(' as ')[0].trim());
            for (const name of names) {
                imports.push({ name, path });
            }
        } else if (defaultImport) {
            // Handle default imports like: import Type from './path'
            imports.push({ name: defaultImport, path });
        }
    }
    
    return imports;
}

function extractExportedName(content: string): { type: 'class' | 'interface' | 'enum', name:string } | null {
    const match = content.match(/export\s+(?:class|interface|enum)\s+(\w+)/);
    if (match) {
        const type = content.includes(`enum ${match[1]}`) ? 'enum' : 'class';
        return { type, name: match[1] };
    }
    return null;
}

async function createComposerJson() {
    const composerJsonPath = path.join(OUTPUT_DIR, 'composer.json');
    const composerJsonContent = {
        "name": "hoster/contracts",
        "description": "Auto-generated contracts from TypeScript definitions.",
        "type": "library",
        "autoload": {
            "psr-4": {
                [`${ROOT_NAMESPACE}\\`]: "."
            }
        },
        "require": {
            "php": ">=8.1"
        }
    };
    
    if (!fs.existsSync(composerJsonPath)) {
        await fs.writeFile(composerJsonPath, JSON.stringify(composerJsonContent, null, 2));
        console.log(`\n${colors.green}✓ Created composer.json${colors.reset}`);
    }
}

async function processFile(filePath: string, outputBaseDir: string, isEnum: boolean) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const exported = extractExportedName(content);

        if (!exported) {
            console.log(`  ${colors.yellow}No exported types found in ${path.basename(filePath)}${colors.reset}`);
            return;
        }

        stats.processed++;
        const { name, type } = exported;
        
        const baseSourceDir = isEnum ? SOURCE_DIRS.enums : SOURCE_DIRS.dtos;
        const relativePath = path.dirname(path.relative(baseSourceDir, filePath));
        
        const namespaceParts = [ROOT_NAMESPACE]
            .concat(isEnum ? ['Enums'] : ['Dtos'])
            .concat(relativePath === '.' ? [] : relativePath.split(path.sep).map(p => p.charAt(0).toUpperCase() + p.slice(1)));
        const namespace = namespaceParts.join('\\');
        
        const outputDir = path.join(outputBaseDir, relativePath);
        await fs.ensureDir(outputDir);

        const outputFileName = `${name}.php`;
        const outputPath = path.join(outputDir, outputFileName);

        let phpCode = '';
        if (isEnum) {
            phpCode = generatePhpEnum(name, content, namespace);
        } else {
            phpCode = generatePhpClass(name, content, namespace);
            
            // Special handling for specific DTOs that need manual imports
            if (name === 'RequestDto') {
                // Add the required use statements for RequestDto
                const useStatements = [
                    `use ${ROOT_NAMESPACE}\\Dtos\\Sender\\EmailSenderDto;`,
                    `use ${ROOT_NAMESPACE}\\Dtos\\Sender\\SmsSenderDto;`,
                    `use ${ROOT_NAMESPACE}\\Dtos\\Sender\\PushSenderDto;`,
                    `use ${ROOT_NAMESPACE}\\Dtos\\Receiver\\EmailReceiverDto;`,
                    `use ${ROOT_NAMESPACE}\\Dtos\\Receiver\\SmsReceiverDto;`,
                    `use ${ROOT_NAMESPACE}\\Dtos\\Receiver\\PushReceiverDto;`
                ].join('\n');
                
                // Insert use statements after namespace declaration
                phpCode = phpCode.replace(
                    `namespace ${namespace};\n\n`, 
                    `namespace ${namespace};\n\n${useStatements}\n\n`
                );
            }
        }

        await fs.writeFile(outputPath, phpCode);
        console.log(`    ${colors.green}✓ Success${colors.reset} → ${path.relative(OUTPUT_DIR, outputPath)}`);
        stats.successful++;

    } catch (error) {
        console.error(`    ${colors.red}✗ Failed${colors.reset} - ${error instanceof Error ? error.message : String(error)}`);
        stats.failed++;
    }
}

async function generatePhpCode() {
    console.log(`${colors.cyan}=== Generating PHP code ===${colors.reset}`);
    
    // Process DTOs
    console.log(`\n${colors.blue}Processing DTOs from ${SOURCE_DIRS.dtos}${colors.reset}`);
    const dtoFiles = await findFiles(`${SOURCE_DIRS.dtos}/**/*.ts`);
    for (const file of dtoFiles) {
        console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
        await processFile(file, path.join(OUTPUT_DIR, 'dtos'), false);
    }

    // Process Enums
    console.log(`\n${colors.blue}Processing Enums from ${SOURCE_DIRS.enums}${colors.reset}`);
    const enumFiles = await findFiles(`${SOURCE_DIRS.enums}/**/*.ts`);
    for (const file of enumFiles) {
        console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
        await processFile(file, path.join(OUTPUT_DIR, 'enums'), true);
    }
}

async function main() {
    try {
        await setupDirectories();
        
        console.log(`${colors.cyan}=== TypeScript to PHP Code Generator ===${colors.reset}`);
        console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
        console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
        console.log(`Output Directory: ${OUTPUT_DIR}`);

        await generatePhpCode();
        await createComposerJson();

        console.log(`\n${colors.cyan}=== Generation Summary ===${colors.reset}`);
        console.log(`Total processed: ${stats.processed}`);
        console.log(`${colors.green}Successful: ${stats.successful}${colors.reset}`);
        if (stats.failed > 0) {
            console.log(`${colors.red}Failed: ${stats.failed}${colors.reset}`);
        }
        console.log(`\n${colors.green}✨ Generation complete! Files saved to: ${OUTPUT_DIR}${colors.reset}`);

    } catch (error) {
        console.error(`${colors.red}Error: ${error instanceof Error ? error.message : String(error)}${colors.reset}`);
        process.exit(1);
    }
}

main();