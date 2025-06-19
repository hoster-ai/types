#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// --- Configuration ---
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, 'dtos'),
  enums: path.resolve(__dirname, 'enums')
};

const OUTPUT_DIR = path.resolve(__dirname, '../generated/ruby');

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
  failed: 0,
  files: [] as string[]
};

// --- Type mapping from TypeScript to Ruby comment types ---
// Ruby is dynamically typed, so we use comments for type hints (YARD)
const typeMapping: Record<string, string> = {
  'string': 'String',
  'number': 'Float',
  'boolean': 'Boolean',
  'any': 'Object',
  'Date': 'Time',
  'object': 'Hash',
  'string[]': 'Array<String>',
  'number[]': 'Array<Float>',
  'boolean[]': 'Array<Boolean>',
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

function toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '');
}

function convertType(tsType: string): string {
  let isOptional = false;
  if (tsType.endsWith('?')) {
    isOptional = true;
    tsType = tsType.slice(0, -1);
  }

  if (tsType.includes('|')) {
      const types = tsType.split('|').map(t => t.trim()).filter(t => t !== 'null');
      const rubyTypes = types.map(t => convertType(t));
      return `[${rubyTypes.join(', ')}]`;
  }

  if (tsType.endsWith('[]')) {
    const baseType = tsType.slice(0, -2);
    return `Array<${convertType(baseType)}>`;
  }

  const genericMatch = tsType.match(/(\w+)<(.+)>/);
  if (genericMatch) {
    const container = genericMatch[1];
    const inner = genericMatch[2];
    if (container === 'Array') {
      return `Array<${convertType(inner)}>`;
    }
    if (container === 'Record') {
      const [key, value] = inner.split(',').map(t => t.trim());
      return `Hash{${convertType(key)} => ${convertType(value)}}`;
    }
  }

  return typeMapping[tsType] || tsType;
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

function generateRubyClass(name: string, content: string): string {
    const fields = extractFields(content);
    
    const attrs = fields.map(field => `    attr_accessor :${toSnakeCase(field.name)}`).join('\n');

    const initializer = fields.map(field => {
        const snakeName = toSnakeCase(field.name);
        let defaultValue = field.defaultValue;
        if (field.type.endsWith('?')) {
            defaultValue = 'nil';
        }
        return `${snakeName}: ${defaultValue || 'nil'}`;
    }).join(', ');

    const assignments = fields.map(field => {
        const snakeName = toSnakeCase(field.name);
        return `      @${snakeName} = ${snakeName}`;
    }).join('\n');

    const yardComments = fields.map(field => {
        const snakeName = toSnakeCase(field.name);
        const rubyType = convertType(field.type);
        return `  # @!attribute [rw] ${snakeName}\n  #   @return [${rubyType}]`;
    }).join('\n');

    return `# frozen_string_literal: true

# Represents the ${name} DTO.
class ${name}
${yardComments}
${attrs}

  # Initializes a new instance of the ${name} class.
  # @param [Hash] args
  def initialize(${initializer})
${assignments}
  end
end
`;
}

function generateRubyEnum(name: string, content: string): string {
    const values = extractEnumValues(content);
    if (values.length === 0) return '';

    const constants = values.map(v => `    ${v.name} = ${v.value}`).join('\n');

    return `# frozen_string_literal: true

# Defines constants for ${name}.
module ${name}
${constants}
end
`;
}

function extractExportedName(content: string): { type: 'class' | 'interface' | 'enum', name: string } | null {
    const match = content.match(/export\s+(?:class|interface|enum)\s+(\w+)/);
    if (match) {
        const type = content.includes(`enum ${match[1]}`) ? 'enum' : 'class';
        return { type, name: match[1] };
    }
    return null;
}

async function createMainImportFile() {
    const mainRbPath = path.join(OUTPUT_DIR, 'main.rb');
    const requireStatements = stats.files.map(f => `require_relative '${f}'`).join('\n');
    const content = `# frozen_string_literal: true

# Auto-generated file. Load all generated contracts.
${requireStatements}
`;
    await fs.writeFile(mainRbPath, content);
    console.log(`\n${colors.green}✓ Created main.rb entry file${colors.reset}`);
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

        const snakeName = toSnakeCase(name.replace(/(Dto|Enum)$/, ''));
        const outputFileName = `${snakeName}.rb`;
        const outputPath = path.join(outputDir, outputFileName);

        let rubyCode = '';
        if (isEnum) {
            rubyCode = generateRubyEnum(name, content);
        } else {
            rubyCode = generateRubyClass(name, content);
        }

        await fs.writeFile(outputPath, rubyCode);
        const relativeOutputPath = path.relative(OUTPUT_DIR, outputPath);
        stats.files.push(relativeOutputPath);
        console.log(`    ${colors.green}✓ Success${colors.reset} → ${relativeOutputPath}`);
        stats.successful++;

    } catch (error) {
        console.error(`    ${colors.red}✗ Failed${colors.reset} - ${error instanceof Error ? error.message : String(error)}`);
        stats.failed++;
    }
}

async function generateRubyCode() {
    console.log(`${colors.cyan}=== Generating Ruby code ===${colors.reset}`);
    
    console.log(`\n${colors.blue}Processing DTOs from ${SOURCE_DIRS.dtos}${colors.reset}`);
    const dtoFiles = await findFiles(`${SOURCE_DIRS.dtos}/**/*.ts`);
    for (const file of dtoFiles) {
        console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
        await processFile(file, path.join(OUTPUT_DIR, 'dtos'), false);
    }

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
        
        console.log(`${colors.cyan}=== TypeScript to Ruby Code Generator ===${colors.reset}`);
        console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
        console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
        console.log(`Output Directory: ${OUTPUT_DIR}`);

        await generateRubyCode();
        await createMainImportFile();

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
