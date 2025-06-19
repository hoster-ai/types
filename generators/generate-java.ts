#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// Configuration
const SOURCE_DIRS = {
  dtos: path.resolve(__dirname, 'dtos'),
  enums: path.resolve(__dirname, 'enums')
};

const OUTPUT_DIR = path.resolve(__dirname, '../generated/java');
const PACKAGE_NAME = 'com.hoster.contracts';

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

// Type mapping from TypeScript to Java
const typeMapping: Record<string, string> = {
  'string': 'String',
  'number': 'Double',
  'boolean': 'Boolean',
  'any': 'Object',
  'Date': 'java.util.Date',
  'object': 'java.util.Map<String, Object>',
  'Array<': 'java.util.List<',
  'Record<': 'java.util.Map<',
  'string[]': 'java.util.List<String>',
  'number[]': 'java.util.List<Double>',
  'boolean[]': 'java.util.List<Boolean>'
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
  
  // Create package directories
  const dtoPackage = path.join(OUTPUT_DIR, ...PACKAGE_NAME.split('.'), 'dto');
  const enumPackage = path.join(OUTPUT_DIR, ...PACKAGE_NAME.split('.'), 'enums');
  
  await fs.ensureDir(dtoPackage);
  await fs.ensureDir(enumPackage);
}

// Convert TypeScript type to Java type
function convertType(tsType: string): string {
  // Java doesn't have nullable types like TypeScript/C#, but we can use Optional
  let isOptional = false;
  if (tsType.endsWith('?')) {
    isOptional = true;
    tsType = tsType.slice(0, -1);
  }
  
  // Check for union types with | operator
  if (tsType.includes(' | ')) {
    // Java doesn't have union types, so we use Object or a more specific common type
    const unionTypes = tsType.split(' | ').map(t => t.trim());
    
    // Check if null or undefined is in union
    if (unionTypes.includes('null') || unionTypes.includes('undefined')) {
      // Filter out null and undefined
      const nonNullTypes = unionTypes.filter(t => t !== 'null' && t !== 'undefined');
      
      // If only one type remains, use it
      if (nonNullTypes.length === 1) {
        return isOptional ? `java.util.Optional<${convertType(nonNullTypes[0])}>` : convertType(nonNullTypes[0]);
      }
    }
    
    // Check if all types are the same base type (e.g., all strings)
    const allStrings = unionTypes.every(t => t === 'string' || t.startsWith('"'));
    if (allStrings) {
      return isOptional ? 'java.util.Optional<String>' : 'String';
    }
    
    // Check if all types are numbers
    const allNumbers = unionTypes.every(t => t === 'number' || !isNaN(Number(t)));
    if (allNumbers) {
      return isOptional ? 'java.util.Optional<Double>' : 'Double';
    }
    
    // Default to Object for mixed types
    return isOptional ? 'java.util.Optional<Object>' : 'Object';
  }
  
  // Check direct mappings
  if (typeMapping[tsType]) {
    const javaType = typeMapping[tsType];
    return isOptional ? `java.util.Optional<${javaType}>` : javaType;
  }
  
  // Handle arrays
  if (tsType.includes('[]')) {
    const baseType = tsType.replace('[]', '');
    const javaBaseType = convertType(baseType);
    return isOptional ? `java.util.Optional<java.util.List<${javaBaseType}>>` : `java.util.List<${javaBaseType}>`;
  }
  
  // Handle generics
  if (tsType.includes('<') && tsType.includes('>')) {
    const genericMatch = tsType.match(/([A-Za-z]+)<([^>]+)>/);
    if (genericMatch) {
      const container = genericMatch[1];
      const innerType = genericMatch[2];
      
      if (container === 'Array') {
        const javaType = `java.util.List<${convertType(innerType)}>`;
        return isOptional ? `java.util.Optional<${javaType}>` : javaType;
      } else if (container === 'Record' || container === 'Map') {
        const keyValuePair = innerType.split(',').map(t => t.trim());
        if (keyValuePair.length === 2) {
          const javaType = `java.util.Map<${convertType(keyValuePair[0])}, ${convertType(keyValuePair[1])}>`;
          return isOptional ? `java.util.Optional<${javaType}>` : javaType;
        }
      }
    }
  }
  
  // Default: keep the type name (likely a custom type)
  return isOptional ? `java.util.Optional<${tsType}>` : tsType;
}

// Convert field name to Java convention
function toJavaFieldName(name: string): string {
  // Java uses camelCase for field names
  return name;
}

// Convert to Java getter/setter name
function toJavaAccessorName(name: string): string {
  // Capitalize first letter for Java getter/setter convention
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Extract field information from TypeScript class/interface
function extractFields(content: string): Array<{ name: string, type: string, isOptional: boolean, comment: string }> {
  const fields: Array<{ name: string, type: string, isOptional: boolean, comment: string }> = [];
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
      
      // Convert TypeScript type to Java type
      const javaType = convertType(type);
      
      fields.push({
        name: toJavaFieldName(name),
        type: javaType,
        isOptional,
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

// Generate Java class from TypeScript class/interface
function generateJavaClass(name: string, content: string): string {
  const fields = extractFields(content);
  
  let javaClass = '// Auto-generated from TypeScript\n';
  javaClass += `package ${PACKAGE_NAME}.dto;\n\n`;
  
  // Add imports
  const imports = new Set<string>();
  imports.add('import com.fasterxml.jackson.annotation.JsonProperty;');
  
  let hasOptional = false;
  let hasList = false;
  let hasMap = false;
  let hasDate = false;
  
  for (const field of fields) {
    if (field.type.includes('Optional<')) {
      hasOptional = true;
    }
    if (field.type.includes('List<')) {
      hasList = true;
    }
    if (field.type.includes('Map<')) {
      hasMap = true;
    }
    if (field.type.includes('Date')) {
      hasDate = true;
    }
  }
  
  if (hasOptional) imports.add('import java.util.Optional;');
  if (hasList) imports.add('import java.util.List;');
  if (hasMap) imports.add('import java.util.Map;');
  if (hasDate) imports.add('import java.util.Date;');
  
  // Add Lombok annotations for boilerplate reduction
  imports.add('import lombok.Data;');
  
  // Add imports alphabetically
  Array.from(imports).sort().forEach(imp => {
    javaClass += `${imp}\n`;
  });
  
  javaClass += '\n/**\n';
  javaClass += ` * ${name} Data Transfer Object\n`;
  javaClass += ' */\n';
  javaClass += '@Data\n';
  javaClass += `public class ${name} {\n\n`;
  
  for (const field of fields) {
    // Add JavaDoc comment if available
    if (field.comment) {
      javaClass += `    /**\n`;
      javaClass += `     * ${field.comment}\n`;
      javaClass += `     */\n`;
    }
    
    // Add Jackson annotation for JSON property name
    javaClass += `    @JsonProperty("${field.name}")\n`;
    
    // Add field declaration
    javaClass += `    private ${field.type} ${field.name};\n\n`;
  }
  
  javaClass += '}\n';
  return javaClass;
}

// Generate Java enum from TypeScript enum
function generateJavaEnum(name: string, content: string): string {
  const values = extractEnumValues(content);
  
  let javaEnum = '// Auto-generated from TypeScript\n';
  javaEnum += `package ${PACKAGE_NAME}.enums;\n\n`;
  
  // Add imports
  javaEnum += 'import com.fasterxml.jackson.annotation.JsonValue;\n\n';
  
  javaEnum += '/**\n';
  javaEnum += ` * ${name} enumeration\n`;
  javaEnum += ' */\n';
  javaEnum += `public enum ${name} {\n`;
  
  // Determine if it's a string or numeric enum
  const isStringEnum = values.length > 0 && values[0].value.startsWith('"');
  
  for (let i = 0; i < values.length; i++) {
    const val = values[i];
    
    if (isStringEnum) {
      javaEnum += `    ${val.name}(${val.value})${i < values.length - 1 ? ',' : ';'}\n`;
    } else {
      javaEnum += `    ${val.name}(${val.value})${i < values.length - 1 ? ',' : ';'}\n`;
    }
  }
  
  // For string enums, add field and methods
  if (isStringEnum) {
    javaEnum += '\n    private final String value;\n\n';
    javaEnum += '    private ' + name + '(String value) {\n';
    javaEnum += '        this.value = value;\n';
    javaEnum += '    }\n\n';
    javaEnum += '    @JsonValue\n';
    javaEnum += '    public String getValue() {\n';
    javaEnum += '        return value;\n';
    javaEnum += '    }\n';
  } else {
    javaEnum += '\n    private final int value;\n\n';
    javaEnum += '    private ' + name + '(int value) {\n';
    javaEnum += '        this.value = value;\n';
    javaEnum += '    }\n\n';
    javaEnum += '    @JsonValue\n';
    javaEnum += '    public int getValue() {\n';
    javaEnum += '        return value;\n';
    javaEnum += '    }\n';
  }
  
  javaEnum += '}\n';
  return javaEnum;
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

// Process a TypeScript file and convert it to Java
async function processFile(filePath: string, isEnum: boolean): Promise<void> {
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
    
    // Create package directories
    const packageDir = path.join(OUTPUT_DIR, ...PACKAGE_NAME.split('.'), isEnum ? 'enums' : 'dto');
    await fs.ensureDir(packageDir);
    
    const outputFile = path.join(packageDir, `${name}.java`);
    
    // Generate Java code
    let javaCode = '';
    
    if (isEnum || type === 'enum') {
      javaCode = generateJavaEnum(name, content);
    } else {
      javaCode = generateJavaClass(name, content);
    }
    
    // Write to file
    await fs.writeFile(outputFile, javaCode);
    console.log(`    ${colors.green}✓ Success${colors.reset} → ${path.basename(outputFile)}`);
    stats.successful++;
  } catch (error) {
    console.error(`    ${colors.red}✗ Failed${colors.reset} - ${error instanceof Error ? error.message : String(error)}`);
    stats.failed++;
  }
}

// Process all TypeScript files in the specified directories
async function generateJavaCode() {
  console.log(`${colors.cyan}=== Generating Java code ===${colors.reset}`);
  
  // Process DTOs
  console.log(`\n${colors.blue}Processing DTOs from ${SOURCE_DIRS.dtos}${colors.reset}`);
  const dtoFiles = await findFiles(`${SOURCE_DIRS.dtos}/**/*.ts`);
  for (const file of dtoFiles) {
    console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
    await processFile(file, false);
  }
  
  // Process Enums
  console.log(`\n${colors.blue}Processing Enums from ${SOURCE_DIRS.enums}${colors.reset}`);
  const enumFiles = await findFiles(`${SOURCE_DIRS.enums}/**/*.ts`);
  for (const file of enumFiles) {
    console.log(`  📄 Processing: ${colors.yellow}${path.basename(file)}${colors.reset}`);
    await processFile(file, true);
  }
}

// Main function
async function main() {
  try {
    // Setup directories
    await setupDirectories();
    
    console.log(`${colors.cyan}=== TypeScript to Java Code Generator ===${colors.reset}`);
    console.log(`Source DTOs: ${SOURCE_DIRS.dtos}`);
    console.log(`Source Enums: ${SOURCE_DIRS.enums}`);
    console.log(`Output Directory: ${OUTPUT_DIR}`);
    
    // Generate Java code
    await generateJavaCode();
    
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
