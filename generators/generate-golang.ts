#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// Configuration
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, '../dtos'),
  enums: path.resolve(__dirname, '../enums')
};

const OUTPUT_DIR = path.resolve(__dirname, '../generated/golang');

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Stats tracking
const stats = {
  processed: 0,
  successful: 0,
  failed: 0
};

// Type mapping from TypeScript to Go
const typeMapping: Record<string, string> = {
  'string': 'string',
  'number': 'float64',
  'boolean': 'bool',
  'any': 'interface{}',
  'Date': 'time.Time',
  'object': 'map[string]interface{}',
  'Array<': '[]',
  'Record<': 'map[',
  'string[]': '[]string',
  'number[]': '[]float64',
  'boolean[]': '[]bool'
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
  await fs.ensureDir(OUTPUT_DIR);
  await fs.ensureDir(path.join(OUTPUT_DIR, 'dtos'));
  await fs.ensureDir(path.join(OUTPUT_DIR, 'enums'));
}

// Convert TypeScript type to Go type
function convertType(tsType: string): string {
  // Check direct mappings
  if (typeMapping[tsType]) {
    return typeMapping[tsType];
  }
  
  // Handle arrays
  if (tsType.includes('[]')) {
    const baseType = tsType.replace('[]', '');
    const goBaseType = convertType(baseType);
    return `[]${goBaseType}`;
  }
  
  // Handle generics
  if (tsType.includes('<') && tsType.includes('>')) {
    const genericMatch = tsType.match(/([A-Za-z]+)<([^>]+)>/);
    if (genericMatch) {
      const container = genericMatch[1];
      const innerType = genericMatch[2];
      
      if (container === 'Array') {
        return `[]${convertType(innerType)}`;
      } else if (container === 'Record' || container === 'Map') {
        const keyValuePair = innerType.split(',').map(t => t.trim());
        if (keyValuePair.length === 2) {
          return `map[${convertType(keyValuePair[0])}]${convertType(keyValuePair[1])}`;
        }
      }
    }
  }
  
  // Handle optional types (ending with ?)
  if (tsType.endsWith('?')) {
    const baseType = tsType.slice(0, -1);
    return `*${convertType(baseType)}`;
  }
  
  // Default: keep the type name (likely a custom type)
  return tsType;
}

// Extract field information from TypeScript class/interface
function extractFields(content: string): Array<{ name: string, type: string, tags: string, comment: string }> {
  const fields: Array<{ name: string, type: string, tags: string, comment: string }> = [];
  const lines = content.split('\n');
  
  let currentComment = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Collect comments
    if (line.startsWith('/**') || line.startsWith('/*')) {
      currentComment = '';
      continue;
    }
    
    if (line.startsWith('*')) {
      currentComment += line.substring(1).trim() + ' ';
      continue;
    }
    
    if (line.startsWith('*/')) {
      currentComment = currentComment.trim();
      continue;
    }
    
    // Skip decorators
    if (line.startsWith('@')) {
      continue;
    }
    
    // Extract field definition
    const fieldMatch = line.match(/([a-zA-Z0-9_]+)(\??):\s*([^;]+);/);
    if (fieldMatch) {
      const name = fieldMatch[1];
      const isOptional = fieldMatch[2] === '?';
      let type = fieldMatch[3].trim();
      
      // Convert TypeScript type to Go type
      const goType = convertType(type);
      
      // Build JSON tag
      const jsonTag = `\`json:"${name}"\``;
      
      fields.push({
        name,
        type: isOptional ? `*${goType}` : goType,
        tags: jsonTag,
        comment: currentComment
      });
      
      currentComment = '';
    }
  }
  
  return fields;
}

// Extract enum values from TypeScript enum
function extractEnumValues(content: string): Array<{ name: string, value: string }> {
  const values: Array<{ name: string, value: string }> = [];
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip comments and decorators
    if (line.startsWith('//') || line.startsWith('/*') || line.startsWith('*') || line.startsWith('@')) {
      continue;
    }
    
    // Extract enum value definition
    const enumMatch = line.match(/([A-Za-z0-9_]+)\s*=\s*['"]?([^,'"]+)['"]?,?/);
    if (enumMatch) {
      const name = enumMatch[1];
      let value = enumMatch[2].trim();
      
      // If the value is numeric, keep it as is
      if (!isNaN(Number(value))) {
        values.push({ name, value });
      } else {
        // For string values, add quotes
        values.push({ name, value: `"${value}"` });
      }
    }
  }
  
  return values;
}

// Generate Go struct from TypeScript class/interface
function generateGoStruct(name: string, content: string): string {
  const fields = extractFields(content);
  
  let goStruct = `// ${name} represents a ${name} DTO\n`;
  goStruct += `type ${name} struct {\n`;
  
  for (const field of fields) {
    if (field.comment) {
      goStruct += `\t// ${field.comment}\n`;
    }
    // Capitalize first letter of field name for Go export
    const goFieldName = field.name.charAt(0).toUpperCase() + field.name.slice(1);
    goStruct += `\t${goFieldName} ${field.type} ${field.tags}\n`;
  }
  
  goStruct += `}\n`;
  return goStruct;
}

// Generate Go enum (using iota or string constants) from TypeScript enum
function generateGoEnum(name: string, content: string): string {
  const values = extractEnumValues(content);
  
  // Determine if it's a string or numeric enum
  const isStringEnum = values.length > 0 && values[0].value.startsWith('"');
  
  let goEnum = '';
  
  if (isStringEnum) {
    // Generate string constants
    goEnum += `// ${name} enum values\n`;
    goEnum += `type ${name} string\n\n`;
    goEnum += `const (\n`;
    
    for (const val of values) {
      goEnum += `\t${name}${val.name} ${name} = ${val.value}\n`;
    }
    
    goEnum += `)\n`;
  } else {
    // Generate numeric constants with iota
    goEnum += `// ${name} enum values\n`;
    goEnum += `type ${name} int\n\n`;
    goEnum += `const (\n`;
    
    // Start with iota for the first one
    let first = true;
    for (const val of values) {
      if (first) {
        goEnum += `\t${name}${val.name} ${name} = iota\n`;
        first = false;
      } else {
        goEnum += `\t${name}${val.name}\n`;
      }
    }
    
    goEnum += `)\n`;
  }
  
  return goEnum;
}

// Extract exported type or enum name
function extractExportedName(content: string): { type: 'class' | 'interface' | 'enum', name: string } | null {
  // Try to match a class
  const classMatch = content.match(/export\s+class\s+([A-Za-z0-9_]+)/);
  if (classMatch) {
    return { type: 'class', name: classMatch[1] };
  }
  
  // Try to match an interface
  const interfaceMatch = content.match(/export\s+interface\s+([A-Za-z0-9_]+)/);
  if (interfaceMatch) {
    return { type: 'interface', name: interfaceMatch[1] };
  }
  
  // Try to match an enum
  const enumMatch = content.match(/export\s+enum\s+([A-Za-z0-9_]+)/);
  if (enumMatch) {
    return { type: 'enum', name: enumMatch[1] };
  }
  
  return null;
}

// Process a TypeScript file and convert it to Go
async function processFile(filePath: string, outputDir: string, isEnum: boolean): Promise<void> {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const exportedType = extractExportedName(content);
    
    if (!exportedType) {
      console.log(`  ${colors.yellow}No exported types found in ${path.basename(filePath)}${colors.reset}`);
      return;
    }
    
    stats.processed++;
    
    const { name } = exportedType;
    console.log(`  → Converting ${colors.yellow}${name}${colors.reset}`);
    
    // Create output file path
    const fileName = path.basename(filePath, '.ts')
      .replace('.dto', '')
      .replace('.enum', '');
    
    const relativePath = path.relative(isEnum ? SOURCE_DIRS.enums : SOURCE_DIRS.dtos, filePath);
    const dirName = path.dirname(relativePath);
    
    // Create output subdirectories if needed
    const outputSubDir = path.join(outputDir, dirName);
    await fs.ensureDir(outputSubDir);
    
    const outputFile = path.join(outputSubDir, `${fileName}.go`);
    
    // Generate Go code
    let goCode = 'package contracts\n\n';
    
    // Add imports if needed
    if (content.includes('Date')) {
      goCode += 'import "time"\n\n';
    }
    
    if (isEnum || exportedType.type === 'enum') {
      goCode += generateGoEnum(name, content);
    } else {
      goCode += generateGoStruct(name, content);
    }
    
    // Write to file
    await fs.writeFile(outputFile, goCode);
    console.log(`    ${colors.green}✓ Success${colors.reset} → ${path.basename(outputFile)}`);
    stats.successful++;
  } catch (error) {
    console.error(`    ${colors.red}✗ Failed${colors.reset} - ${error instanceof Error ? error.message : String(error)}`);
    stats.failed++;
  }
}

// Process all TypeScript files in the specified directories
async function generateGolangCode() {
  console.log(`${colors.cyan}=== Generating Go code ===${colors.reset}`);
  
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

// Main function
async function main() {
  try {
    // Setup directories
    await setupDirectories();
    
    console.log(`${colors.cyan}=== TypeScript to Go Code Generator ===${colors.reset}`);
    console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
    console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
    console.log(`Output Directory: ${OUTPUT_DIR}`);
    
    // Generate Go code
    await generateGolangCode();
    
    // Print summary
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

// Run the script
main();
