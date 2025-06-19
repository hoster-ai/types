#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// Configuration
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, 'dtos'),
  enums: path.resolve(__dirname, 'enums')
};

const OUTPUT_DIR = path.resolve(__dirname, '../generated/csharp');
const NAMESPACE = 'Hoster.Contracts';

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

// Type mapping from TypeScript to C#
const typeMapping: Record<string, string> = {
  'string': 'string',
  'number': 'double',
  'boolean': 'bool',
  'any': 'object',
  'Date': 'DateTime',
  'object': 'Dictionary<string, object>',
  'Array<': 'List<',
  'Record<': 'Dictionary<',
  'string[]': 'List<string>',
  'number[]': 'List<double>',
  'boolean[]': 'List<bool>'
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
  await fs.ensureDir(path.join(OUTPUT_DIR, 'DTOs'));
  await fs.ensureDir(path.join(OUTPUT_DIR, 'Enums'));
}

// Convert TypeScript type to C# type
function convertType(tsType: string): string {
  // Handle optional types (ending with ?)
  let isNullable = false;
  if (tsType.endsWith('?')) {
    isNullable = true;
    tsType = tsType.slice(0, -1);
  }
  
  // Check for union types with | operator
  if (tsType.includes(' | ')) {
    // C# doesn't have direct union types, so we default to object
    // or a more specific common type if possible
    const unionTypes = tsType.split(' | ').map(t => t.trim());
    
    // Check if null or undefined is in union
    if (unionTypes.includes('null') || unionTypes.includes('undefined')) {
      isNullable = true;
      // Filter out null and undefined
      const nonNullTypes = unionTypes.filter(t => t !== 'null' && t !== 'undefined');
      
      // If only one type remains, use it
      if (nonNullTypes.length === 1) {
        return convertType(nonNullTypes[0]) + (isNullable ? '?' : '');
      }
    }
    
    // Check if all types are the same base type (e.g., all strings)
    const allStrings = unionTypes.every(t => t === 'string' || t.startsWith('"'));
    if (allStrings) {
      return isNullable ? 'string?' : 'string';
    }
    
    // Check if all types are numbers
    const allNumbers = unionTypes.every(t => t === 'number' || !isNaN(Number(t)));
    if (allNumbers) {
      return isNullable ? 'double?' : 'double';
    }
    
    // Default to object for mixed types
    return isNullable ? 'object?' : 'object';
  }
  
  // Check direct mappings
  if (typeMapping[tsType]) {
    const csharpType = typeMapping[tsType];
    // Value types need ? for nullable, reference types don't
    const isValueType = ['int', 'double', 'float', 'decimal', 'bool', 'DateTime'].some(t => csharpType === t);
    return isNullable && isValueType ? `${csharpType}?` : csharpType;
  }
  
  // Handle arrays
  if (tsType.includes('[]')) {
    const baseType = tsType.replace('[]', '');
    const csharpBaseType = convertType(baseType);
    return `List<${csharpBaseType}>`;
  }
  
  // Handle generics
  if (tsType.includes('<') && tsType.includes('>')) {
    const genericMatch = tsType.match(/([A-Za-z]+)<([^>]+)>/);
    if (genericMatch) {
      const container = genericMatch[1];
      const innerType = genericMatch[2];
      
      if (container === 'Array') {
        return `List<${convertType(innerType)}>`;
      } else if (container === 'Record' || container === 'Map') {
        const keyValuePair = innerType.split(',').map(t => t.trim());
        if (keyValuePair.length === 2) {
          return `Dictionary<${convertType(keyValuePair[0])}, ${convertType(keyValuePair[1])}>`;
        }
      }
    }
  }
  
  // Default: keep the type name (likely a custom type)
  return isNullable ? `${tsType}?` : tsType;
}

// Extract field information from TypeScript class/interface
function extractFields(content: string): Array<{ name: string, type: string, isRequired: boolean, comment: string }> {
  const fields: Array<{ name: string, type: string, isRequired: boolean, comment: string }> = [];
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
      
      // Convert TypeScript type to C# type
      const csharpType = convertType(type);
      
      fields.push({
        name: name.charAt(0).toUpperCase() + name.slice(1), // C# convention: PascalCase for properties
        type: csharpType,
        isRequired: !isOptional,
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

// Generate C# class from TypeScript class/interface
function generateCSharpClass(name: string, content: string): string {
  const fields = extractFields(content);
  
  let csharpClass = '// Auto-generated from TypeScript\n';
  csharpClass += 'using System;\n';
  csharpClass += 'using System.Collections.Generic;\n';
  csharpClass += 'using System.Text.Json.Serialization;\n\n';
  
  csharpClass += `namespace ${NAMESPACE}.DTOs\n{\n`;
  csharpClass += `    /// <summary>\n`;
  csharpClass += `    /// ${name} DTO\n`;
  csharpClass += `    /// </summary>\n`;
  csharpClass += `    public class ${name}\n    {\n`;
  
  for (const field of fields) {
    if (field.comment) {
      csharpClass += `        /// <summary>\n`;
      csharpClass += `        /// ${field.comment}\n`;
      csharpClass += `        /// </summary>\n`;
    }
    
    csharpClass += `        [JsonPropertyName("${field.name.charAt(0).toLowerCase() + field.name.slice(1)}")]\n`;
    
    if (field.isRequired) {
      csharpClass += `        [JsonRequired]\n`;
    }
    
    csharpClass += `        public ${field.type} ${field.name} { get; set; }\n\n`;
  }
  
  csharpClass += '    }\n}\n';
  return csharpClass;
}

// Generate C# enum from TypeScript enum
function generateCSharpEnum(name: string, content: string): string {
  const values = extractEnumValues(content);
  
  let csharpEnum = '// Auto-generated from TypeScript\n';
  csharpEnum += 'using System.Text.Json.Serialization;\n\n';
  
  csharpEnum += `namespace ${NAMESPACE}.Enums\n{\n`;
  csharpEnum += `    /// <summary>\n`;
  csharpEnum += `    /// ${name} enumeration\n`;
  csharpEnum += `    /// </summary>\n`;
  
  // Determine if it's a string or numeric enum
  const isStringEnum = values.length > 0 && values[0].value.startsWith('"');
  
  if (isStringEnum) {
    csharpEnum += `    [JsonConverter(typeof(JsonStringEnumConverter))]\n`;
  }
  
  csharpEnum += `    public enum ${name}\n    {\n`;
  
  for (let i = 0; i < values.length; i++) {
    const val = values[i];
    
    if (isStringEnum) {
      csharpEnum += `        [JsonPropertyName(${val.value})]\n`;
      csharpEnum += `        ${val.name}${i < values.length - 1 ? ',' : ''}\n\n`;
    } else {
      csharpEnum += `        ${val.name} = ${val.value}${i < values.length - 1 ? ',' : ''}\n`;
    }
  }
  
  csharpEnum += '    }\n}\n';
  return csharpEnum;
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

// Process a TypeScript file and convert it to C#
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
    
    const outputFile = path.join(outputDir, `${name}.cs`);
    
    // Generate C# code
    let csharpCode = '';
    
    if (isEnum || type === 'enum') {
      csharpCode = generateCSharpEnum(name, content);
    } else {
      csharpCode = generateCSharpClass(name, content);
    }
    
    // Write to file
    await fs.writeFile(outputFile, csharpCode);
    console.log(`    ${colors.green}✓ Success${colors.reset} → ${path.basename(outputFile)}`);
    stats.successful++;
  } catch (error) {
    console.error(`    ${colors.red}✗ Failed${colors.reset} - ${error instanceof Error ? error.message : String(error)}`);
    stats.failed++;
  }
}

// Process all TypeScript files in the specified directories
async function generateCSharpCode() {
  console.log(`${colors.cyan}=== Generating C# code ===${colors.reset}`);
  
  // Process DTOs
  console.log(`\n${colors.blue}Processing DTOs from ${SOURCE_DIRS.dtos}${colors.reset}`);
  const dtoFiles = await findFiles(`${SOURCE_DIRS.dtos}/**/*.ts`);
  for (const file of dtoFiles) {
    console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
    await processFile(file, path.join(OUTPUT_DIR, 'DTOs'), false);
  }
  
  // Process Enums
  console.log(`\n${colors.blue}Processing Enums from ${SOURCE_DIRS.enums}${colors.reset}`);
  const enumFiles = await findFiles(`${SOURCE_DIRS.enums}/**/*.ts`);
  for (const file of enumFiles) {
    console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
    await processFile(file, path.join(OUTPUT_DIR, 'Enums'), true);
  }
}

// Main function
async function main() {
  try {
    // Setup directories
    await setupDirectories();
    
    console.log(`${colors.cyan}=== TypeScript to C# Code Generator ===${colors.reset}`);
    console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
    console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
    console.log(`Output Directory: ${OUTPUT_DIR}`);
    
    // Generate C# code
    await generateCSharpCode();
    
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
