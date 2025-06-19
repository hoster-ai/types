#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// --- Configuration ---
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, 'dtos'),
  enums: path.resolve(__dirname, 'enums')
};

const OUTPUT_DIR = path.resolve(__dirname, 'generated/swift');

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

// --- Type mapping from TypeScript to Swift ---
const typeMapping: Record<string, string> = {
  'string': 'String',
  'number': 'Double',
  'boolean': 'Bool',
  'any': 'Any',
  'Date': 'Date',
  'object': '[String: Any]',
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
  await fs.ensureDir(path.join(OUTPUT_DIR, 'Dtos'));
  await fs.ensureDir(path.join(OUTPUT_DIR, 'Enums'));
}

function convertType(tsType: string): string {
  let isOptional = false;
  if (tsType.endsWith('?')) {
    isOptional = true;
    tsType = tsType.slice(0, -1);
  }

  if (tsType.includes('|')) {
      const types = tsType.split('|').map(t => t.trim());
      if (types.includes('null')) {
        isOptional = true;
      }
      const nonNullType = types.filter(t => t !== 'null')[0] || 'any';
      return convertType(`${nonNullType}${isOptional ? '?' : ''}`);
  }

  let swiftType;
  if (tsType.endsWith('[]')) {
    const baseType = tsType.slice(0, -2);
    swiftType = `[${convertType(baseType)}]`;
  } else {
    const genericMatch = tsType.match(/(\w+)<(.+)>/);
    if (genericMatch) {
        const container = genericMatch[1];
        const inner = genericMatch[2];
        if (container === 'Array') {
            swiftType = `[${convertType(inner)}]`;
        } else if (container === 'Record') {
            const [key, value] = inner.split(',').map(t => t.trim());
            swiftType = `[${convertType(key)}: ${convertType(value)}]`;
        } else {
            swiftType = typeMapping[tsType] || tsType;
        }
    } else {
        swiftType = typeMapping[tsType] || tsType;
    }
  }

  return `${swiftType}${isOptional ? '?' : ''}`;
}

function extractFields(content: string): Array<{ name: string, type: string }> {
    const fields: Array<{ name: string, type: string }> = [];
    const fieldRegex = /(?:public\s+|readonly\s+)?(\w+\??):\s*([^;=\n]+)/g;
    let match;
    while ((match = fieldRegex.exec(content)) !== null) {
        const [_, name, type] = match;
        if (name && type) {
            fields.push({ name: name.replace('?', ''), type: `${type.trim()}${name.endsWith('?') ? '?' : ''}` });
        }
    }
    return fields;
}

function extractEnumValues(content: string): Array<{ name: string, value: string }> {
    const values: Array<{ name: string, value: string }> = [];
    const enumRegex = /(\w+)\s*=\s*([`'"]([\w-]+)[`'"]|\d+)/g;
    let match;
    while ((match = enumRegex.exec(content)) !== null) {
        values.push({ name: match[1], value: match[3] || match[2] });
    }
    return values;
}

function generateSwiftStruct(name: string, content: string): string {
    const fields = extractFields(content);
    
    const structFields = fields.map(field => {
        const swiftType = convertType(field.type);
        return `    let ${field.name}: ${swiftType}`;
    }).join('\n');

    return `import Foundation

struct ${name}: Codable {
${structFields}
}
`;
}

function generateSwiftEnum(name: string, content: string): string {
    const values = extractEnumValues(content);
    if (values.length === 0) return '';

    const isStringBacked = isNaN(parseInt(values[0].value, 10));
    const backingType = isStringBacked ? 'String' : 'Int';

    const enumCases = values.map(v => {
        const caseName = v.name.charAt(0).toLowerCase() + v.name.slice(1);
        return `    case ${caseName} = ${isStringBacked ? `"${v.value}"` : v.value}`;
    }).join('\n');

    return `import Foundation

enum ${name}: ${backingType}, Codable {
${enumCases}
}
`;
}

function extractExportedName(content: string): { type: 'class' | 'interface' | 'enum', name: string } | null {
    const match = content.match(/export\s+(?:class|interface|enum)\s+(\w+)/);
    if (match) {
        const type = content.includes(`enum ${match[1]}`) ? 'enum' : 'class';
        return { type, name: match[1].replace(/(Dto|Enum)$/, '') };
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
        const relativeDir = path.dirname(path.relative(baseSourceDir, filePath));
        const outputDir = path.join(outputBaseDir, relativeDir);
        await fs.ensureDir(outputDir);

        const outputFileName = `${name}.swift`;
        const outputPath = path.join(outputDir, outputFileName);

        let swiftCode = '';
        if (isEnum) {
            swiftCode = generateSwiftEnum(name, content);
        } else {
            swiftCode = generateSwiftStruct(name, content);
        }

        await fs.writeFile(outputPath, swiftCode);
        const relativeOutputPath = path.relative(OUTPUT_DIR, outputPath);
        console.log(`    ${colors.green}✓ Success${colors.reset} → ${relativeOutputPath}`);
        stats.successful++;

    } catch (error) {
        console.error(`    ${colors.red}✗ Failed${colors.reset} - ${error instanceof Error ? error.message : String(error)}`);
        stats.failed++;
    }
}

async function generateSwiftCode() {
    console.log(`${colors.cyan}=== Generating Swift code ===${colors.reset}`);
    
    console.log(`\n${colors.blue}Processing DTOs from ${SOURCE_DIRS.dtos}${colors.reset}`);
    const dtoFiles = await findFiles(`${SOURCE_DIRS.dtos}/**/*.ts`);
    for (const file of dtoFiles) {
        console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
        await processFile(file, path.join(OUTPUT_DIR, 'Dtos'), false);
    }

    console.log(`\n${colors.blue}Processing Enums from ${SOURCE_DIRS.enums}${colors.reset}`);
    const enumFiles = await findFiles(`${SOURCE_DIRS.enums}/**/*.ts`);
    for (const file of enumFiles) {
        console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
        await processFile(file, path.join(OUTPUT_DIR, 'Enums'), true);
    }
}

async function main() {
    try {
        await setupDirectories();
        
        console.log(`${colors.cyan}=== TypeScript to Swift Code Generator ===${colors.reset}`);
        console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
        console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
        console.log(`Output Directory: ${OUTPUT_DIR}`);

        await generateSwiftCode();

        console.log(`\n${colors.cyan}=== Generation Summary ===${colors.reset}`);
        console.log(`Total processed: ${stats.processed}`);
        console.log(`${colors.green}Successful: ${stats.successful}${colors.reset}`);
        if (stats.failed > 0) {
            console.log(`${colors.red}Failed: ${stats.failed}${colors.reset}`);
        }
        console.log(`\n${colors.green}✨ Generation complete! Files saved to: ${OUTPUT_DIR}${colors.reset}`);

    } catch (error) {
        console.error(`${colors.red}Error: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}

main();
