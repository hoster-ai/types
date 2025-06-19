#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// --- Configuration ---
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, 'dtos'),
  enums: path.resolve(__dirname, 'enums')
};

const OUTPUT_DIR = path.resolve(__dirname, '../generated/kotlin');
const ROOT_PACKAGE = 'com.hoster.contracts';

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

// --- Type mapping from TypeScript to Kotlin ---
const typeMapping: Record<string, string> = {
  'string': 'String',
  'number': 'Double',
  'boolean': 'Boolean',
  'any': 'Any',
  'Date': 'java.time.ZonedDateTime',
  'object': 'Map<String, Any>',
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
  // No need to create subdirs here, processFile will do it
}

function convertType(tsType: string): { kotlinType: string, imports: Set<string> } {
  let isOptional = false;
  const imports = new Set<string>();

  if (tsType.endsWith('?')) {
    isOptional = true;
    tsType = tsType.slice(0, -1);
  }
  
  if (tsType.includes('|')) {
      const types = tsType.split('|').map(t => t.trim());
      if (types.includes('null')) {
          isOptional = true;
      }
      const nonNullTypes = types.filter(t => t !== 'null');
      if (nonNullTypes.length > 1) {
          return { kotlinType: `Any${isOptional ? '?' : ''}`, imports };
      }
      tsType = nonNullTypes[0];
  }

  if (tsType.endsWith('[]')) {
    const baseType = tsType.slice(0, -2);
    const convertedBase = convertType(baseType);
    convertedBase.imports.forEach(imp => imports.add(imp));
    imports.add('java.util.List');
    return { kotlinType: `List<${convertedBase.kotlinType}>${isOptional ? '?' : ''}`, imports };
  }

  const genericMatch = tsType.match(/(\w+)<(.+)>/);
  if (genericMatch) {
    const container = genericMatch[1];
    const inner = genericMatch[2];
    if (container === 'Array') {
      const innerConverted = convertType(inner);
      innerConverted.imports.forEach(imp => imports.add(imp));
      imports.add('java.util.List');
      return { kotlinType: `List<${innerConverted.kotlinType}>${isOptional ? '?' : ''}`, imports };
    }
    if (container === 'Record') {
      const [key, value] = inner.split(',').map(t => t.trim());
      const keyConverted = convertType(key);
      const valueConverted = convertType(value);
      keyConverted.imports.forEach(imp => imports.add(imp));
      valueConverted.imports.forEach(imp => imports.add(imp));
      imports.add('java.util.Map');
      return { kotlinType: `Map<${keyConverted.kotlinType}, ${valueConverted.kotlinType}>${isOptional ? '?' : ''}`, imports };
    }
  }

  let kotlinType = typeMapping[tsType] || tsType;
  
  if (kotlinType.startsWith('java.')) {
      imports.add(kotlinType);
  }

  return { kotlinType: `${kotlinType}${isOptional ? '?' : ''}`, imports };
}

function extractFields(content: string): Array<{ name: string, type: string, defaultValue: string | null }> {
    const fields: Array<{ name: string, type: string, defaultValue: string | null }> = [];
    const fieldRegex = /(?:public\s+|readonly\s+)?(\w+\??):\s*([^;=\n]+)(?:\s*=\s*([^;]+))?/g;
    let match;
    while ((match = fieldRegex.exec(content)) !== null) {
        const [fullMatch, name, type, defaultValue] = match;
        if (name && type) {
            fields.push({
                name: name.replace('?', ''),
                type: `${type.trim()}${name.endsWith('?') ? '?' : ''}`,
                defaultValue: defaultValue ? defaultValue.trim() : null
            });
        }
    }
    return fields;
}

function extractEnumValues(content: string): Array<{ name: string, value: string }> {
    const values: Array<{ name: string, value: string }> = [];
    const enumRegex = /(\w+)\s*=\s*([`'"][\w-]+[`'"]|\d+)/g;
    let match;
    while ((match = enumRegex.exec(content)) !== null) {
        values.push({ name: match[1], value: match[2].replace(/[`'"]/g, '') });
    }
    return values;
}

function generateKotlinDataClass(name: string, content: string, packageName: string): string {
    const fields = extractFields(content);
    const allImports = new Set<string>();

    const properties = fields.map(field => {
        const { kotlinType, imports } = convertType(field.type);
        imports.forEach(imp => allImports.add(imp));
        
        let prop = `    val ${field.name}: ${kotlinType}`;
        if (field.defaultValue) {
          let kotlinDefault = field.defaultValue;
          if (convertType(field.type).kotlinType === 'String') {
            kotlinDefault = `"${kotlinDefault.replace(/['"]/g, '')}"`;
          }
          prop += ` = ${kotlinDefault}`;
        } else if (kotlinType.endsWith('?')) {
          prop += ' = null';
        }
        return prop;
    }).join(',\n');

    const importStatements = [...allImports].map(imp => `import ${imp};`).join('\n');

    return `package ${packageName}\n\n${importStatements}\n\ndata class ${name}(\n${properties}\n)\n`;
}

function generateKotlinEnum(name: string, content: string, packageName: string): string {
    const values = extractEnumValues(content);
    if (values.length === 0) return '';

    const isStringBacked = isNaN(parseInt(values[0].value, 10));
    
    if (!isStringBacked) {
        const cases = values.map(v => `    ${v.name}`).join(',\n');
        return `package ${packageName}\n\nenum class ${name} {\n${cases}\n}\n`;
    }

    const properties = `val value: String`;
    const cases = values.map(v => `    ${v.name}("${v.value}")`).join(',\n');

    return `package ${packageName}\n\nenum class ${name}(${properties}) {\n${cases};\n}\n`;
}

function extractExportedName(content: string): { type: 'class' | 'interface' | 'enum', name: string } | null {
    const match = content.match(/export\s+(?:class|interface|enum)\s+(\w+)/);
    if (match) {
        const type = content.includes(`enum ${match[1]}`) ? 'enum' : 'class';
        return { type, name: match[1] };
    }
    return null;
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
        const { name } = exported;
        
        const baseSourceDir = isEnum ? SOURCE_DIRS.enums : SOURCE_DIRS.dtos;
        const relativePath = path.dirname(path.relative(baseSourceDir, filePath));
        
        const packageParts = [ROOT_PACKAGE]
            .concat(isEnum ? ['enums'] : ['dtos'])
            .concat(relativePath === '.' ? [] : relativePath.split(path.sep));
        const packageName = packageParts.join('.');
        
        const outputDir = path.join(outputBaseDir, ...relativePath.split(path.sep));
        await fs.ensureDir(outputDir);

        const outputFileName = `${name}.kt`;
        const outputPath = path.join(outputDir, outputFileName);

        let kotlinCode = '';
        if (isEnum) {
            kotlinCode = generateKotlinEnum(name, content, packageName);
        } else {
            kotlinCode = generateKotlinDataClass(name, content, packageName);
        }

        await fs.writeFile(outputPath, kotlinCode);
        console.log(`    ${colors.green}✓ Success${colors.reset} → ${path.relative(path.join(OUTPUT_DIR, '..'), outputPath)}`);
        stats.successful++;

    } catch (error) {
        console.error(`    ${colors.red}✗ Failed${colors.reset} - ${error instanceof Error ? error.message : String(error)}`);
        stats.failed++;
    }
}

async function generateKotlinCode() {
    console.log(`${colors.cyan}=== Generating Kotlin code ===${colors.reset}`);
    
    const dtosOutputDir = path.join(OUTPUT_DIR, 'dtos');
    console.log(`\n${colors.blue}Processing DTOs from ${SOURCE_DIRS.dtos}${colors.reset}`);
    const dtoFiles = await findFiles(`${SOURCE_DIRS.dtos}/**/*.ts`);
    for (const file of dtoFiles) {
        console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
        await processFile(file, dtosOutputDir, false);
    }

    const enumsOutputDir = path.join(OUTPUT_DIR, 'enums');
    console.log(`\n${colors.blue}Processing Enums from ${SOURCE_DIRS.enums}${colors.reset}`);
    const enumFiles = await findFiles(`${SOURCE_DIRS.enums}/**/*.ts`);
    for (const file of enumFiles) {
        console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
        await processFile(file, enumsOutputDir, true);
    }
}

async function main() {
    try {
        await setupDirectories();
        
        console.log(`${colors.cyan}=== TypeScript to Kotlin Code Generator ===${colors.reset}`);
        console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
        console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
        console.log(`Output Directory: ${OUTPUT_DIR}`);

        await generateKotlinCode();

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
