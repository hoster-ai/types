#!/usr/bin/env node
// post-process-schemas.js

const fs = require('fs');
const path = require('path');

const SCHEMAS_DIR = './schemas';
const DTOS_DIR = path.join(SCHEMAS_DIR, 'dtos');
const ENUMS_DIR = path.join(SCHEMAS_DIR, 'enums');

// Αποθηκεύει όλα τα enums που βρήκαμε
const foundEnums = new Map();

/**
 * Εξάγει enum definitions από ένα schema
 */
function extractEnumsFromSchema(schema, schemaPath) {
  const enums = {};
  
  function findEnums(obj, currentPath = '') {
    if (!obj || typeof obj !== 'object') return;
    
    // Έλεγχος αν είναι enum (έχει enum property με array)
    if (Array.isArray(obj.enum) && obj.type === 'string') {
      // Προσπάθησε να βρεις το όνομα από το path
      const pathParts = currentPath.split('.');
      let enumName = pathParts[pathParts.length - 1];
      
      // Αν το όνομα τελειώνει σε Enum, κράτησέ το
      if (enumName && enumName.endsWith('Enum')) {
        enums[enumName] = {
          type: 'string',
          enum: obj.enum,
          title: enumName
        };
        foundEnums.set(enumName, enums[enumName]);
      }
    }
    
    // Έλεγχος definitions
    if (obj.definitions) {
      Object.entries(obj.definitions).forEach(([name, def]) => {
        if (def.enum && def.type === 'string') {
          enums[name] = {
            type: 'string',
            enum: def.enum,
            title: name
          };
          foundEnums.set(name, enums[name]);
        }
        findEnums(def, `${currentPath}.definitions.${name}`);
      });
    }
    
    // Έλεγχος properties
    if (obj.properties) {
      Object.entries(obj.properties).forEach(([propName, prop]) => {
        findEnums(prop, `${currentPath}.properties.${propName}`);
      });
    }
    
    // Έλεγχος items (για arrays)
    if (obj.items) {
      findEnums(obj.items, `${currentPath}.items`);
    }
    
    // Έλεγχος anyOf, oneOf, allOf
    ['anyOf', 'oneOf', 'allOf'].forEach(key => {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          findEnums(item, `${currentPath}.${key}[${index}]`);
        });
      }
    });
  }
  
  findEnums(schema);
  return enums;
}

/**
 * Αντικαθιστά inline enums με $ref
 */
function replaceEnumsWithRefs(obj, enumName) {
  if (!obj || typeof obj !== 'object') return obj;
  
  // Αν είναι enum που ταιριάζει, αντικατέστησέ το με $ref
  if (Array.isArray(obj.enum) && obj.type === 'string') {
    const foundEnum = Array.from(foundEnums.entries()).find(([name, enumDef]) => {
      return JSON.stringify(enumDef.enum) === JSON.stringify(obj.enum);
    });
    
    if (foundEnum) {
      return {
        $ref: `../enums/${foundEnum[0].toLowerCase().replace(/enum$/, '')}.enum.schema.json`
      };
    }
  }
  
  // Recursive processing
  if (Array.isArray(obj)) {
    return obj.map(item => replaceEnumsWithRefs(item, enumName));
  }
  
  const newObj = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (key === 'definitions' && foundEnums.size > 0) {
      // Αφαίρεσε enum definitions
      const filteredDefs = {};
      Object.entries(value).forEach(([defName, defValue]) => {
        if (!foundEnums.has(defName)) {
          filteredDefs[defName] = replaceEnumsWithRefs(defValue, enumName);
        }
      });
      if (Object.keys(filteredDefs).length > 0) {
        newObj[key] = filteredDefs;
      }
    } else {
      newObj[key] = replaceEnumsWithRefs(value, enumName);
    }
  });
  
  return newObj;
}

/**
 * Κύρια συνάρτηση επεξεργασίας
 */
async function processSchemas() {
  console.log('🔄 Post-processing JSON Schemas...\n');
  
  // Recursive function για να βρει όλα τα .json αρχεία
  function findJsonFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat && stat.isDirectory()) {
        results = results.concat(findJsonFiles(filePath));
      } else if (file.endsWith('.json')) {
        results.push(filePath);
      }
    });
    
    return results;
  }
  
  // Βήμα 1: Διάβασε όλα τα DTO schemas και εξάγαγε enums
  const dtoFiles = findJsonFiles(DTOS_DIR);
  
  console.log(`📊 Βρέθηκαν ${dtoFiles.length} DTO schemas\n`);
  
  // Πρώτο πέρασμα: Βρες όλα τα enums
  dtoFiles.forEach(filePath => {
    const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const enums = extractEnumsFromSchema(schema, filePath);
    const relativePath = path.relative(DTOS_DIR, filePath);
    
    if (Object.keys(enums).length > 0) {
      console.log(`📄 ${relativePath}: Βρέθηκαν ${Object.keys(enums).length} enums`);
    }
  });
  
  console.log(`\n🔍 Συνολικά βρέθηκαν ${foundEnums.size} μοναδικά enums\n`);
  
  // Βήμα 2: Δημιούργησε ξεχωριστά enum schema files
  foundEnums.forEach((enumDef, enumName) => {
    const fileName = enumName.toLowerCase().replace(/enum$/, '') + '.enum.schema.json';
    const filePath = path.join(ENUMS_DIR, fileName);
    
    const enumSchema = {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": enumName,
      "type": "string",
      "enum": enumDef.enum
    };
    
    fs.writeFileSync(filePath, JSON.stringify(enumSchema, null, 2));
    console.log(`✅ Δημιουργήθηκε: ${fileName}`);
  });
  
  console.log('\n🔧 Ενημέρωση DTO schemas με $ref...\n');
  
  // Βήμα 3: Ενημέρωσε τα DTO schemas
  let updatedCount = 0;
  dtoFiles.forEach(filePath => {
    const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const relativePath = path.relative(DTOS_DIR, filePath);
    
    const updatedSchema = replaceEnumsWithRefs(schema);
    
    // Έλεγξε αν άλλαξε κάτι
    if (JSON.stringify(schema) !== JSON.stringify(updatedSchema)) {
      fs.writeFileSync(filePath, JSON.stringify(updatedSchema, null, 2));
      console.log(`📝 Ενημερώθηκε: ${relativePath}`);
      updatedCount++;
    }
  });
  
  console.log(`\n✨ Ολοκληρώθηκε! Ενημερώθηκαν ${updatedCount} DTOs`);
}

// Εκτέλεση
processSchemas().catch(console.error);