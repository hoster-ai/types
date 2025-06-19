#!/usr//bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// --- Configuration ---
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, 'dtos'),
  enums: path.resolve(__dirname, 'enums')
};

const OUTPUT_DIR = path.resolve(__dirname, 'generated/rust/src');

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
  modules: new Set<string>()
};

// --- Type mapping from TypeScript to Rust ---
const typeMapping: Record<string, string> = {
  'string': 'String',
  'number': 'f64',
  'boolean': 'bool',
  'any': 'serde_json::Value',
  'Date': 'chrono::DateTime<chrono::Utc>',
  'object': 'std::collections::HashMap<String, serde_json::Value>',
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
      const types = tsType.split('|').map(t => t.trim());
      if (types.includes('null')) {
        isOptional = true;
      }
      const nonNullType = types.filter(t => t !== 'null')[0] || 'any';
      return convertType(`${nonNullType}${isOptional ? '?' : ''}`);
  }

  let rustType;
  if (tsType.endsWith('[]')) {
    const baseType = tsType.slice(0, -2);
    rustType = `Vec<${convertType(baseType)}>`;
  } else {
    const genericMatch = tsType.match(/(\w+)<(.+)>/);
    if (genericMatch) {
        const container = genericMatch[1];
        const inner = genericMatch[2];
        if (container === 'Array') {
            rustType = `Vec<${convertType(inner)}>`;
        } else if (container === 'Record') {
            const [key, value] = inner.split(',').map(t => t.trim());
            rustType = `std::collections::HashMap<${convertType(key)}, ${convertType(value)}>`;
        } else {
            rustType = typeMapping[tsType] || tsType;
        }
    } else {
        rustType = typeMapping[tsType] || tsType;
    }
  }

  return isOptional ? `Option<${rustType}>` : rustType;
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
    const enumRegex = /(\w+)\s*=\s*([`'"][\w-]+[`'"]|\d+)/g;
    let match;
    while ((match = enumRegex.exec(content)) !== null) {
        values.push({ name: match[1], value: match[2].replace(/[`'"]/g, '') });
    }
    return values;
}

function generateRustStruct(name: string, content: string): string {
    const fields = extractFields(content);
    
    const structFields = fields.map(field => {
        const snakeName = toSnakeCase(field.name);
        const rustType = convertType(field.type);
        return `    pub ${snakeName}: ${rustType},`;
    }).join('\n');

    return `use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ${name} {
${structFields}
}
`;
}

function generateRustEnum(name: string, content: string): string {
    const values = extractEnumValues(content);
    if (values.length === 0) return '';

    const enumValues = values.map(v => `    ${v.name},`).join('\n');

    return `use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum ${name} {
${enumValues}
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

async function createModFile(dir: string, moduleName: string) {
    const modPath = path.join(dir, 'mod.rs');
    const content = `pub mod ${moduleName};
`;
    await fs.appendFile(modPath, content);
    stats.modules.add(modPath);
}

async function createCargoToml() {
    const cargoPath = path.resolve(OUTPUT_DIR, '..', 'Cargo.toml');
    const content = `[package]
name = "contracts"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
chrono = { version = "0.4", features = ["serde"] }
`;
    if (!fs.existsSync(cargoPath)) {
        await fs.writeFile(cargoPath, content);
        console.log(`\n${colors.green}✓ Created Cargo.toml${colors.reset}`);
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
        const relativeDir = path.dirname(path.relative(baseSourceDir, filePath));
        const outputDir = path.join(outputBaseDir, relativeDir);
        await fs.ensureDir(outputDir);

        const snakeName = toSnakeCase(name);
        const outputFileName = `${snakeName}.rs`;
        const outputPath = path.join(outputDir, outputFileName);

        let rustCode = '';
        if (isEnum) {
            rustCode = generateRustEnum(name, content);
        } else {
            rustCode = generateRustStruct(name, content);
        }

        await fs.writeFile(outputPath, rustCode);

        // Update mod.rs
        await createModFile(path.dirname(outputPath), path.basename(outputPath, '.rs'));

        const relativeOutputPath = path.relative(OUTPUT_DIR, outputPath);
        console.log(`    ${colors.green}✓ Success${colors.reset} → ${relativeOutputPath}`);
        stats.successful++;

    } catch (error) {
        console.error(`    ${colors.red}✗ Failed${colors.reset} - ${error instanceof Error ? error.message : String(error)}`);
        stats.failed++;
    }
}

async function finalizeMods() {
    for (const modPath of stats.modules) {
        const content = await fs.readFile(modPath, 'utf8');
        const uniqueLines = [...new Set(content.split('\n'))].join('\n');
        await fs.writeFile(modPath, uniqueLines);
    }
}

async function generateRustCode() {
    console.log(`${colors.cyan}=== Generating Rust code ===${colors.reset}`);
    
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

    await finalizeMods();
}

async function main() {
    try {
        await setupDirectories();
        
        console.log(`${colors.cyan}=== TypeScript to Rust Code Generator ===${colors.reset}`);
        console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
        console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
        console.log(`Output Directory: ${OUTPUT_DIR}`);

        await generateRustCode();
        await createCargoToml();

        console.log(`\n${colors.cyan}=== Generation Summary ===${colors.reset}`);
        console.log(`Total processed: ${stats.processed}`);
        console.log(`${colors.green}Successful: ${stats.successful}${colors.reset}`);
        if (stats.failed > 0) {
            console.log(`${colors.red}Failed: ${stats.failed}${colors.reset}`);
        }
        console.log(`\n${colors.green}✨ Generation complete! Files saved to: ${path.resolve(OUTPUT_DIR, '..')}${colors.reset}`);

    } catch (error) {
        console.error(`${colors.red}Error: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}

main();
