#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync, spawnSync } from 'child_process';
import { glob } from 'glob';

// Configuration
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, '../dtos'),
  enums: path.resolve(__dirname, '../enums')
};

const OUTPUT_BASE_DIR = path.resolve(__dirname, '../generated');

// Language configuration type
type LanguageConfig = {
  name: string;
  generator: string;
  extension: string;
};

// Supported languages configuration
const LANGUAGES: Record<string, LanguageConfig> = {
  golang: {
    name: 'Go',
    generator: 'generate-golang.ts',
    extension: '.go'
  },
  csharp: {
    name: 'C#',
    generator: 'generate-csharp.ts',
    extension: '.cs'
  },
  python: {
    name: 'Python',
    generator: 'generate-python.ts',
    extension: '.py'
  },
  java: {
    name: 'Java',
    generator: 'generate-java.ts',
    extension: '.java'
  },
  typescript: {
    name: 'TypeScript',
    generator: 'generate-typescript.ts',
    extension: '.ts'
  },
  php: {
    name: 'PHP',
    generator: 'generate-php.ts',
    extension: '.php'
  },
  ruby: {
    name: 'Ruby',
    generator: 'generate-ruby.ts',
    extension: '.rb'
  },
  rust: {
    name: 'Rust',
    generator: 'generate-rust.ts',
    extension: '.rs'
  },
  swift: {
    name: 'Swift',
    generator: 'generate-swift.ts',
    extension: '.swift'
  },
  kotlin: {
    name: 'Kotlin',
    generator: 'generate-kotlin.ts',
    extension: '.kt'
  }
};

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Helper to find TypeScript files
async function findFiles(pattern: string): Promise<string[]> {
  try {
    return await glob(pattern);
  } catch (error) {
    console.error(`Error finding files with pattern ${pattern}: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

// Create directories if they don't exist
async function setupDirectories() {
  // Create output directory
  await fs.ensureDir(OUTPUT_BASE_DIR);
  
  // Create directories for each language
  for (const lang of Object.keys(LANGUAGES)) {
    await fs.ensureDir(path.join(OUTPUT_BASE_DIR, lang));
  }
}

/**
 * Generate code for a specific language by running the language-specific generator script
 */
async function generateForLanguage(language: string): Promise<boolean> {
  const langConfig = LANGUAGES[language];
  if (!langConfig) {
    console.error(`${colors.red}Unsupported language: ${language}${colors.reset}`);
    return false;
  }
  
  console.log(`\n${colors.cyan}=== Generating ${langConfig.name} code ===${colors.reset}`);
  
  // Check if the generator script exists
  const generatorPath = path.join(__dirname, langConfig.generator);
  
  if (!fs.existsSync(generatorPath)) {
    // For languages without an implementation yet, create a placeholder file
    console.log(`${colors.yellow}Generator script for ${langConfig.name} not found. Creating placeholder file.${colors.reset}`);
    await createPlaceholderFile(language);
    return true;
  }
  
  try {
    const result = spawnSync('npx', ['ts-node', generatorPath], {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    return result.status === 0;
  } catch (error) {
    console.error(`${colors.red}Error running generator for ${langConfig.name}: ${error instanceof Error ? error.message : String(error)}${colors.reset}`);
    return false;
  }
}

/**
 * Create a placeholder file for languages without a generator
 */
async function createPlaceholderFile(language: string): Promise<void> {
  const langConfig = LANGUAGES[language];
  const outputDir = path.join(OUTPUT_BASE_DIR, language);
  
  // Create output directory
  await fs.ensureDir(outputDir);
  
  // Create a placeholder README file
  const readmePath = path.join(outputDir, 'README.md');
  
  const content = `# ${langConfig.name} DTO/Enum Definitions

This directory would contain generated ${langConfig.name} code for the DTOs and enums.

To implement this generator, create a file named '${langConfig.generator}' in the project root.

## Expected Structure
- /dtos - Contains all generated DTO classes
- /enums - Contains all generated enum definitions
`;
  
  await fs.writeFile(readmePath, content);
  console.log(`${colors.green}Created placeholder README for ${langConfig.name} at ${readmePath}${colors.reset}`);
}

/**
 * Main function
 */
async function main() {
  try {
    // Setup directories
    await setupDirectories();
    
    console.log(`${colors.cyan}=== DTO/Enum Code Generator ===${colors.reset}`);
    console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
    console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
    console.log(`Output Directory: ${OUTPUT_BASE_DIR}`);
    
    // Get target language from command line argument, or default to golang
    const args = process.argv.slice(2);
    const targetLanguage = args[0] || 'golang';
    
    if (targetLanguage === 'all') {
      // Generate code for all supported languages
      console.log(`${colors.cyan}Generating code for all supported languages${colors.reset}`);
      
      const results: Record<string, boolean> = {};
      for (const language of Object.keys(LANGUAGES)) {
        results[language] = await generateForLanguage(language);
      }
      
      // Print summary
      console.log(`\n${colors.cyan}=== Generation Summary ===${colors.reset}`);
      for (const [language, success] of Object.entries(results)) {
        const langConfig = LANGUAGES[language];
        const statusColor = success ? colors.green : colors.red;
        const status = success ? 'Success' : 'Failed';
        console.log(`${langConfig.name}: ${statusColor}${status}${colors.reset}`);
      }
    } else {
      // Generate code for specific language
      if (!LANGUAGES[targetLanguage]) {
        console.error(`${colors.red}Unsupported language: ${targetLanguage}${colors.reset}`);
        console.error(`Supported languages: ${Object.keys(LANGUAGES).join(', ')}`);
        process.exit(1);
      }
      
      const success = await generateForLanguage(targetLanguage);
      
      // Print summary
      console.log(`\n${colors.cyan}=== Generation Summary ===${colors.reset}`);
      const statusColor = success ? colors.green : colors.red;
      const status = success ? 'Success' : 'Failed';
      console.log(`${LANGUAGES[targetLanguage].name}: ${statusColor}${status}${colors.reset}`);
    }
    
    console.log(`\n${colors.green}✨ Generation complete! Files saved to: ${OUTPUT_BASE_DIR}${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}Error: ${error instanceof Error ? error.message : String(error)}${colors.reset}`);
    process.exit(1);
  }
}

// Run the script
main();
