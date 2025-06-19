#!/usr/bin/env ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from 'child_process';

// Διαδρομές και διαμόρφωση
const ROOT_DIR = path.resolve(__dirname, '..');
const GENERATED_DIR = path.resolve(ROOT_DIR, '/generated');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const PACKAGE_JSON = require(path.resolve(ROOT_DIR, 'package.json'));
const VERSION = PACKAGE_JSON.version;
const ORGANIZATION = 'hosterai';

// Διαμόρφωση γλωσσών και αποθετηρίων
interface LanguageConfig {
  name: string;
  packageManager: string;
  packageFile: string;
  packageName: string;
  sourceDir: string;
  packageTemplate: any;
}

const LANGUAGES: Record<string, LanguageConfig> = {
  npm: {
    name: 'TypeScript/JavaScript',
    packageManager: 'npm',
    packageFile: 'package.json',
    packageName: `@${ORGANIZATION}/contracts`,
    sourceDir: 'npm',
    packageTemplate: {
      name: `@${ORGANIZATION}/contracts`,
      version: VERSION,
      description: 'Cross-language DTOs and ENUMs - TypeScript/JavaScript version',
      main: 'dist/index.js',
      types: 'dist/index.d.ts',
      files: ['dist'],
      keywords: ['dto', 'enum', 'contracts', 'typescript', 'javascript'],
      author: PACKAGE_JSON.author,
      license: PACKAGE_JSON.license,
      dependencies: {
        'class-transformer': '^0.5.1',
        'class-validator': '^0.14.2'
      },
      publishConfig: {
        access: 'public'
      }
    }
  },
  composer: {
    name: 'PHP',
    packageManager: 'composer',
    packageFile: 'composer.json',
    packageName: `${ORGANIZATION}/contracts`,
    sourceDir: 'composer',
    packageTemplate: {
      name: `${ORGANIZATION}/contracts`,
      description: 'Cross-language DTOs and ENUMs - PHP version',
      type: 'library',
      version: VERSION,
      license: PACKAGE_JSON.license,
      authors: [
        {
          name: PACKAGE_JSON.author,
        }
      ],
      autoload: {
        'psr-4': {
          'YourOrg\\Contracts\\': 'src/'
        }
      },
      require: {
        'php': '>=7.4'
      }
    }
  },
  maven: {
    name: 'Java',
    packageManager: 'mvn',
    packageFile: 'pom.xml',
    packageName: `${ORGANIZATION}-contracts`,
    sourceDir: 'maven',
    packageTemplate: {
      // Θα χρησιμοποιήσουμε ένα πρότυπο για το pom.xml αντί για JSON
      groupId: `com.${ORGANIZATION}`,
      artifactId: 'contracts',
      version: VERSION,
      name: 'Contracts',
      description: 'Cross-language DTOs and ENUMs - Java version'
    }
  },
  nuget: {
    name: 'C#',
    packageManager: 'dotnet',
    packageFile: 'YourOrg.Contracts.csproj',
    packageName: `${ORGANIZATION}.Contracts`,
    sourceDir: 'nuget',
    packageTemplate: {
      // Θα χρησιμοποιήσουμε ένα πρότυπο για το .csproj αντί για JSON
      packageId: `${ORGANIZATION}.Contracts`,
      version: VERSION,
      authors: PACKAGE_JSON.author,
      description: 'Cross-language DTOs and ENUMs - C# version'
    }
  },
  pypi: {
    name: 'Python',
    packageManager: 'pip',
    packageFile: 'setup.py',
    packageName: `${ORGANIZATION}_contracts`,
    sourceDir: 'pypi',
    packageTemplate: {
      name: `${ORGANIZATION}_contracts`,
      version: VERSION,
      description: 'Cross-language DTOs and ENUMs - Python version',
      author: PACKAGE_JSON.author,
      authorEmail: '',
      url: '',
      packages: ['contracts'],
      classifiers: [
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: ISC License (ISCL)',
        'Operating System :: OS Independent',
      ]
    }
  }
};

// Συναρτήσεις για τη δημιουργία των package files ανά γλώσσα
function createNpmPackage(config: LanguageConfig) {
  const targetDir = path.resolve(GENERATED_DIR, config.sourceDir);
  const distDir = path.resolve(targetDir, 'dist');

  fs.ensureDirSync(targetDir);
  fs.ensureDirSync(distDir);

  // Αντιγραφή των compiled αρχείων
  fs.copySync(DIST_DIR, distDir);

  // Δημιουργία του package.json
  fs.writeJsonSync(
    path.resolve(targetDir, config.packageFile),
    config.packageTemplate,
    { spaces: 2 }
  );

  console.log(`Prepared ${config.name} package in ${targetDir}`);
}

function createComposerPackage(config: LanguageConfig) {
  const targetDir = path.resolve(GENERATED_DIR, config.sourceDir);
  const srcDir = path.resolve(targetDir, 'src');

  fs.ensureDirSync(targetDir);
  fs.ensureDirSync(srcDir);

  // Αντιγραφή των generated PHP αρχείων
  const phpSourceDir = path.resolve(GENERATED_DIR, 'php');
  if (fs.existsSync(phpSourceDir)) {
    fs.copySync(phpSourceDir, srcDir);
  }

  // Δημιουργία του composer.json
  fs.writeJsonSync(
    path.resolve(targetDir, config.packageFile),
    config.packageTemplate,
    { spaces: 2 }
  );

  console.log(`Prepared ${config.name} package in ${targetDir}`);
}

function createMavenPackage(config: LanguageConfig) {
  const targetDir = path.resolve(GENERATED_DIR, config.sourceDir);
  const srcDir = path.resolve(targetDir, 'src/main/java');

  fs.ensureDirSync(targetDir);
  fs.ensureDirSync(srcDir);

  // Αντιγραφή των generated Java αρχείων
  const javaSourceDir = path.resolve(GENERATED_DIR, 'java');
  if (fs.existsSync(javaSourceDir)) {
    fs.copySync(javaSourceDir, srcDir);
  }

  // Δημιουργία του pom.xml
  const pomXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>${config.packageTemplate.groupId}</groupId>
    <artifactId>${config.packageTemplate.artifactId}</artifactId>
    <version>${config.packageTemplate.version}</version>
    <name>${config.packageTemplate.name}</name>
    <description>${config.packageTemplate.description}</description>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- Add any necessary dependencies here -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.13.4</version>
        </dependency>
        <dependency>
            <groupId>javax.validation</groupId>
            <artifactId>validation-api</artifactId>
            <version>2.0.1.Final</version>
        </dependency>
    </dependencies>
</project>`;

  fs.writeFileSync(path.resolve(targetDir, config.packageFile), pomXmlContent);

  console.log(`Prepared ${config.name} package in ${targetDir}`);
}

function createNuGetPackage(config: LanguageConfig) {
  const targetDir = path.resolve(GENERATED_DIR, config.sourceDir);

  fs.ensureDirSync(targetDir);

  // Αντιγραφή των generated C# αρχείων
  const csharpSourceDir = path.resolve(GENERATED_DIR, 'csharp');
  if (fs.existsSync(csharpSourceDir)) {
    fs.copySync(csharpSourceDir, targetDir);
  }

  // Δημιουργία του .csproj
  const csprojContent = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <PackageId>${config.packageTemplate.packageId}</PackageId>
    <Version>${config.packageTemplate.version}</Version>
    <Authors>${config.packageTemplate.authors}</Authors>
    <Description>${config.packageTemplate.description}</Description>
    <PackageLicenseExpression>ISC</PackageLicenseExpression>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Newtonsoft.Json" Version="13.0.1" />
    <PackageReference Include="System.ComponentModel.Annotations" Version="5.0.0" />
  </ItemGroup>

</Project>`;

  fs.writeFileSync(path.resolve(targetDir, config.packageFile), csprojContent);

  console.log(`Prepared ${config.name} package in ${targetDir}`);
}

function createPyPiPackage(config: LanguageConfig) {
  const targetDir = path.resolve(GENERATED_DIR, config.sourceDir);
  const packageDir = path.resolve(targetDir, 'contracts');

  fs.ensureDirSync(targetDir);
  fs.ensureDirSync(packageDir);

  // Αντιγραφή των generated Python αρχείων
  const pythonSourceDir = path.resolve(GENERATED_DIR, 'python');
  if (fs.existsSync(pythonSourceDir)) {
    fs.copySync(pythonSourceDir, packageDir);
  }

  // Δημιουργία του __init__.py
  fs.writeFileSync(path.resolve(packageDir, '__init__.py'), '');

  // Δημιουργία του setup.py
  const setupPyContent = `from setuptools import setup, find_packages

setup(
    name="${config.packageTemplate.name}",
    version="${config.packageTemplate.version}",
    description="${config.packageTemplate.description}",
    author="${config.packageTemplate.author}",
    author_email="${config.packageTemplate.authorEmail}",
    url="${config.packageTemplate.url}",
    packages=find_packages(),
    classifiers=[
        ${config.packageTemplate.classifiers.map(c => `"${c}"`).join(',\n        ')}
    ],
    python_requires=">=3.7",
    install_requires=[
        "pydantic>=1.8.2"
    ]
)`;

  fs.writeFileSync(path.resolve(targetDir, config.packageFile), setupPyContent);

  // Δημιουργία του README.md
  fs.writeFileSync(
    path.resolve(targetDir, 'README.md'),
    `# ${config.packageTemplate.name}\n\n${config.packageTemplate.description}`
  );

  console.log(`Prepared ${config.name} package in ${targetDir}`);
}

// Κύρια συνάρτηση προετοιμασίας πακέτων
async function preparePackages() {
  console.log('Starting package preparation...');
  
  // Δημιουργία των πακέτων για κάθε γλώσσα
  createNpmPackage(LANGUAGES.npm);
  createComposerPackage(LANGUAGES.composer);
  createMavenPackage(LANGUAGES.maven);
  createNuGetPackage(LANGUAGES.nuget);
  createPyPiPackage(LANGUAGES.pypi);
  
  console.log('All packages prepared successfully!');
}

// Εκτέλεση
preparePackages().catch(err => {
  console.error('Error preparing packages:', err);
  process.exit(1);
});
