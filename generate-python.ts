#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// Configuration
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, 'dtos'),
  enums: path.resolve(__dirname, 'enums')
};

const OUTPUT_DIR = path.resolve(__dirname, 'generated/python');

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

// Type mapping from TypeScript to Python
const typeMapping: Record<string, string> = {
  'string': 'str',
  'number': 'float',
  'boolean': 'bool',
  'any': 'Any',
  'Date': 'datetime',
  'object': 'dict',
  'Array<': 'List[',
  'Record<': 'Dict[',
  'string[]': 'List[str]',
  'number[]': 'List[float]',
  'boolean[]': 'List[bool]',
  // Fix for union types
  '|': 'Union['
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

// Convert TypeScript type to Python type
function convertType(tsType: string): string {
  // Handle optional types (ending with ?)
  let isOptional = false;
  if (tsType.endsWith('?')) {
    isOptional = true;
    tsType = tsType.slice(0, -1);
  }
  
  // Check for union types with | operator
  if (tsType.includes(' | ')) {
    const unionTypes = tsType.split(' | ').map(t => convertType(t.trim()));
    return isOptional ? 
      `Optional[Union[${unionTypes.join(', ')}]]` : 
      `Union[${unionTypes.join(', ')}]`;
  }
  
  // Check direct mappings
  if (typeMapping[tsType]) {
    const pythonType = typeMapping[tsType];
    return isOptional ? `Optional[${pythonType}]` : pythonType;
  }
  
  // Handle arrays
  if (tsType.includes('[]')) {
    const baseType = tsType.replace('[]', '');
    const pythonBaseType = convertType(baseType);
    return isOptional ? 
      `Optional[List[${pythonBaseType}]]` : 
      `List[${pythonBaseType}]`;
  }
  
  // Handle generics
  if (tsType.includes('<') && tsType.includes('>')) {
    const genericMatch = tsType.match(/([A-Za-z]+)<([^>]+)>/);
    if (genericMatch) {
      const container = genericMatch[1];
      const innerType = genericMatch[2];
      
      if (container === 'Array') {
        const pythonType = `List[${convertType(innerType)}]`;
        return isOptional ? `Optional[${pythonType}]` : pythonType;
      } else if (container === 'Record' || container === 'Map') {
        const keyValuePair = innerType.split(',').map(t => t.trim());
        if (keyValuePair.length === 2) {
          const pythonType = `Dict[${convertType(keyValuePair[0])}, ${convertType(keyValuePair[1])}]`;
          return isOptional ? `Optional[${pythonType}]` : pythonType;
        }
      }
    }
  }
  
  // Default: keep the type name (likely a custom type)
  return isOptional ? `Optional[${tsType}]` : tsType;
}

// Extract field information from TypeScript class/interface
function extractFields(content: string): Array<{ name: string, type: string, defaultValue: string | null, comment: string }> {
  const fields: Array<{ name: string, type: string, defaultValue: string | null, comment: string }> = [];
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
    const fieldMatch = line.match(/([a-zA-Z0-9_]+)(\??):\s*([^;=]+)(=\s*([^;]+))?;/);
    if (fieldMatch) {
      const name = fieldMatch[1];
      const isOptional = fieldMatch[2] === '?';
      let type = fieldMatch[3].trim();
      let defaultValue = fieldMatch[5] ? fieldMatch[5].trim() : null;
      
      // Convert TypeScript type to Python type
      let pythonType = convertType(type);
      if (isOptional && !pythonType.startsWith('Optional[')) {
        pythonType = `Optional[${pythonType}]`;
      }
      
      // Convert TypeScript default values to Python
      if (defaultValue) {
        if (defaultValue === 'true') defaultValue = 'True';
        else if (defaultValue === 'false') defaultValue = 'False';
        else if (defaultValue === 'null') defaultValue = 'None';
        else if (defaultValue === '[]') defaultValue = '[]';
        else if (defaultValue === '{}') defaultValue = '{}';
      }
      
      fields.push({
        name,
        type: pythonType,
        defaultValue,
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

// Generate Python dataclass from TypeScript class/interface
function generatePythonDataclass(name: string, content: string): string {
  const fields = extractFields(content);
  
  let pythonClass = '# Auto-generated from TypeScript\n';
  pythonClass += 'from dataclasses import dataclass, field\n';
  pythonClass += 'from typing import List, Dict, Optional, Any, Union\n';
  
  // Import datetime if needed
  if (content.includes('Date')) {
    pythonClass += 'from datetime import datetime\n';
  }
  
  pythonClass += '\n\n@dataclass\n';
  pythonClass += `class ${name}:\n`;
  
  if (fields.length === 0) {
    pythonClass += '    pass\n';
    return pythonClass;
  }
  
  for (const field of fields) {
    if (field.comment) {
      pythonClass += `    # ${field.comment}\n`;
    }
    
    if (field.defaultValue) {
      if (field.defaultValue === 'None' && field.type.startsWith('Optional[')) {
        pythonClass += `    ${field.name}: ${field.type} = None\n`;
      } else {
        pythonClass += `    ${field.name}: ${field.type} = ${field.defaultValue}\n`;
      }
    } else if (field.type.startsWith('Optional[')) {
      pythonClass += `    ${field.name}: ${field.type} = None\n`;
    } else if (field.type.startsWith('List[')) {
      pythonClass += `    ${field.name}: ${field.type} = field(default_factory=list)\n`;
    } else if (field.type.startsWith('Dict[')) {
      pythonClass += `    ${field.name}: ${field.type} = field(default_factory=dict)\n`;
    } else {
      pythonClass += `    ${field.name}: ${field.type}\n`;
    }
  }
  
  return pythonClass;
}

// Generate Python enum from TypeScript enum
function generatePythonEnum(name: string, content: string): string {
  const values = extractEnumValues(content);
  
  let pythonEnum = '# Auto-generated from TypeScript\n';
  pythonEnum += 'from enum import Enum, auto\n\n\n';
  pythonEnum += `class ${name}(Enum):\n`;
  
  if (values.length === 0) {
    pythonEnum += '    pass\n';
    return pythonEnum;
  }
  
  // Determine if it's a string or numeric enum
  const isStringEnum = values.length > 0 && values[0].value.startsWith('"');
  
  for (const val of values) {
    pythonEnum += `    ${val.name} = ${val.value}\n`;
  }
  
  return pythonEnum;
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

// Create an __init__.py file in the directory and all parent directories
async function createInitFiles(dirPath: string, baseDir: string) {
  const relativePath = path.relative(baseDir, dirPath);
  const parts = relativePath.split(path.sep);
  
  let currentPath = baseDir;
  for (const part of parts) {
    currentPath = path.join(currentPath, part);
    const initFile = path.join(currentPath, '__init__.py');
    
    if (!fs.existsSync(initFile)) {
      await fs.writeFile(initFile, '# Auto-generated __init__.py file\n');
    }
  }
}

// Process a TypeScript file and convert it to Python
async function processFile(filePath: string, outputDir: string, isEnum: boolean): Promise<void> {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const exportedType = extractExportedName(content);
    
    if (!exportedType) {
      console.log(`  ${colors.yellow}No exported types found in ${path.basename(filePath)}${colors.reset}`);
      return;
    }
    
    stats.processed++;
    
    const { name, type } = exportedType;
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
    
    // Create __init__.py files
    await createInitFiles(outputSubDir, outputDir);
    
    const outputFile = path.join(outputSubDir, `${fileName}.py`);
    
    // Generate Python code
    let pythonCode = '';
    
    if (isEnum || type === 'enum') {
      pythonCode = generatePythonEnum(name, content);
    } else {
      pythonCode = generatePythonDataclass(name, content);
    }
    
    // Write to file
    await fs.writeFile(outputFile, pythonCode);
    console.log(`    ${colors.green}✓ Success${colors.reset} → ${path.basename(outputFile)}`);
    stats.successful++;
  } catch (error) {
    console.error(`    ${colors.red}✗ Failed${colors.reset} - ${error instanceof Error ? error.message : String(error)}`);
    stats.failed++;
  }
}

// Process all TypeScript files in the specified directories
async function generatePythonCode() {
  console.log(`${colors.cyan}=== Generating Python code ===${colors.reset}`);
  
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
    
    console.log(`${colors.cyan}=== TypeScript to Python Code Generator ===${colors.reset}`);
    console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
    console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
    console.log(`Output Directory: ${OUTPUT_DIR}`);
    
    // Generate Python code
    await generatePythonCode();
    
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
