#!/usr/bin/env ts-node
import * as path from 'path';
import { execSync } from 'child_process';

// Διαδρομές και διαμόρφωση
const ROOT_DIR = path.resolve(__dirname, '..');
const GENERATED_DIR = path.resolve(ROOT_DIR, 'generated');

// Διαμόρφωση γλωσσών και αποθετηρίων
interface PublishConfig {
  name: string;
  command: string;
  directory: string;
  options?: string[];
}

const PUBLISH_CONFIGS: Record<string, PublishConfig> = {
  npm: {
    name: 'npm (TypeScript/JavaScript)',
    command: 'npm',
    directory: 'npm',
    options: ['publish', '--access', 'public']
  },
  composer: {
    name: 'Composer (PHP)',
    command: 'composer',
    directory: 'composer',
    options: ['validate']
    // Σημείωση: Για το Composer, συνήθως γίνεται push στο repository και μετά ενημερώνεται το Packagist
  },
  maven: {
    name: 'Maven (Java)',
    command: 'mvn',
    directory: 'maven',
    options: ['deploy']
  },
  nuget: {
    name: 'NuGet (C#)',
    command: 'dotnet',
    directory: 'nuget',
    options: ['pack', '--configuration', 'Release']
    // Μετά: dotnet nuget push bin/Release/*.nupkg --source https://api.nuget.org/v3/index.json --api-key YOUR_API_KEY
  },
  pypi: {
    name: 'PyPI (Python)',
    command: 'python',
    directory: 'pypi',
    options: ['setup.py', 'sdist', 'bdist_wheel']
    // Μετά: twine upload dist/*
  }
};

/**
 * Εκτελεί μια εντολή στο terminal
 */
function executeCommand(command: string, args: string[], cwd: string): void {
  try {
    console.log(`Executing: ${command} ${args.join(' ')}`);
    execSync(`${command} ${args.join(' ')}`, {
      cwd,
      stdio: 'inherit'
    });
  } catch (error) {
    console.error(`Error executing command: ${command}`, error);
    throw error;
  }
}

/**
 * Δημοσιεύει ένα πακέτο στο αντίστοιχο αποθετήριο
 */
function publishPackage(config: PublishConfig): void {
  const packageDir = path.resolve(GENERATED_DIR, config.directory);
  
  console.log(`\n==== Publishing ${config.name} package ====`);
  
  try {
    if (config.options) {
      executeCommand(config.command, config.options, packageDir);
    }
    
    // Ειδικές περιπτώσεις μετά το βασικό command
    switch(config.directory) {
      case 'nuget':
        // Εάν το nuget pack ήταν επιτυχές, κάνουμε push
        console.log('Package created successfully. To push to NuGet:');
        console.log('dotnet nuget push bin/Release/*.nupkg --source https://api.nuget.org/v3/index.json --api-key YOUR_API_KEY');
        break;
      
      case 'pypi':
        // Εάν το build ήταν επιτυχές, χρησιμοποιούμε το twine για upload
        console.log('Package created successfully. To upload to PyPI:');
        console.log('twine upload dist/*');
        break;
        
      case 'composer':
        console.log('For Composer packages, typically you would:');
        console.log('1. Commit and push your package to a Git repository');
        console.log('2. Tag the repository with the version number');
        console.log('3. Register or update your package on Packagist');
        break;
    }
    
    console.log(`✅ ${config.name} package published successfully`);
  } catch (error) {
    console.error(`❌ Failed to publish ${config.name} package`, error);
    throw error;
  }
}

/**
 * Δημοσιεύει όλα τα πακέτα
 */
async function publishAll(): Promise<void> {
  console.log('Starting package publishing process...');
  
  try {
    // Δημοσίευση για npm
    publishPackage(PUBLISH_CONFIGS.npm);
    
    // Για τα υπόλοιπα, μπορεί να χρειαστούν ειδικά βήματα, οπότε μόνο εμφανίζουμε οδηγίες
    console.log('\n==== For other package managers ====');
    console.log('Packages have been prepared in the following directories:');
    
    Object.entries(PUBLISH_CONFIGS)
      .filter(([key]) => key !== 'npm')
      .forEach(([key, config]) => {
        console.log(`- ${config.name}: ${path.resolve(GENERATED_DIR, config.directory)}`);
      });
    
    console.log('\nTo publish these packages, follow the printed instructions for each package manager.');
    console.log('All packages prepared successfully!');
  } catch (error) {
    console.error('Error during publishing process:', error);
    process.exit(1);
  }
}

// Εκτέλεση
publishAll().catch(err => {
  console.error('Error publishing packages:', err);
  process.exit(1);
});
