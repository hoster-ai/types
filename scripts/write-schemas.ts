/**
 * Entry point of `npm run build:schemas`: writes the map built by
 * `generate-schemas.ts` to `openapi/schemas/components.schemas.ts` with a
 * typed `const` export. The npm script runs `prettier` on it afterwards (the
 * committed file is formatted); `generate-schemas.spec.ts` fails while it is
 * stale.
 */
import path from 'node:path';
import fs from 'node:fs';

const outDir = path.resolve(__dirname, '../openapi/schemas');
fs.mkdirSync(outDir, { recursive: true });
const componentsOut = path.join(outDir, 'components.schemas.ts');

// The generator loads the package barrel, which re-exports this very file.
// Stub it first so a stale or conflicted copy cannot block its own
// regeneration, then load the generator.
fs.writeFileSync(
  componentsOut,
  'export const ComponentsSchemas = {} as const;\n',
  'utf8',
);
const { buildComponentsSchemas } =
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./generate-schemas') as typeof import('./generate-schemas');

const componentsContent = `export const ComponentsSchemas = ${JSON.stringify(buildComponentsSchemas(), null, 2)} as const;\n`;
fs.writeFileSync(componentsOut, componentsContent, 'utf8');
console.log(`Generated: ${path.relative(process.cwd(), componentsOut)}`);
