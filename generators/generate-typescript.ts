#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// --- Configuration ---
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, '../dtos'),
  enums: path.resolve(__dirname, '../enums')
};

const OUTPUT_DIR = path.resolve(__dirname, '../generated/typescript');

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
  exports: [] as string[]
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

async function createIndexFile() {
    const indexPath = path.join(OUTPUT_DIR, 'index.ts');
    const exportStatements = stats.exports.map(p => `export * from '${p}';`).join('\n');
    const content = `// Auto-generated barrel file.

${exportStatements}
`;
    await fs.writeFile(indexPath, content);
    console.log(`\n${colors.green}✓ Created index.ts barrel file${colors.reset}`);
}

async function processFile(filePath: string, outputBaseDir: string, isEnum: boolean) {
    try {
        stats.processed++;
        
        const baseSourceDir = isEnum ? SOURCE_DIRS.enums : SOURCE_DIRS.dtos;
        const relativePath = path.relative(baseSourceDir, filePath);
        const outputPath = path.join(outputBaseDir, relativePath);
        
        await fs.ensureDir(path.dirname(outputPath));
        await fs.copyFile(filePath, outputPath);

        const relativeExportPath = `./${path.relative(OUTPUT_DIR, outputPath).replace(/\\/g, '/').replace('.ts', '')}`;
        stats.exports.push(relativeExportPath);

        console.log(`    ${colors.green}✓ Success${colors.reset} → ${path.relative(OUTPUT_DIR, outputPath)}`);
        stats.successful++;

    } catch (error) {
        console.error(`    ${colors.red}✗ Failed${colors.reset} - ${error instanceof Error ? error.message : String(error)}`);
        stats.failed++;
    }
}

async function generateTypeScriptCode() {
    console.log(`${colors.cyan}=== Generating clean TypeScript contracts ===${colors.reset}`);
    
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
        
        console.log(`${colors.cyan}=== TypeScript to TypeScript Contracts Bundler ===${colors.reset}`);
        console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
        console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
        console.log(`Output Directory: ${OUTPUT_DIR}`);

        await generateTypeScriptCode();
        await createIndexFile();

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
