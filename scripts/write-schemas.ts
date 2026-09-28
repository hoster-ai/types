/**
 * Entry point of `npm run build:schemas`: writes the map built by
 * `generate-schemas.ts` to `openapi/schemas/components.schemas.ts` with a
 * typed `const` export. Run `prettier` on it afterwards (the committed file is
 * formatted); `generate-schemas.spec.ts` fails while it is stale.
 */
import path from 'node:path';
import fs from 'node:fs';
import { buildComponentsSchemas } from './generate-schemas';

const outDir = path.resolve(__dirname, '../openapi/schemas');
fs.mkdirSync(outDir, { recursive: true });
const componentsOut = path.join(outDir, 'components.schemas.ts');
const componentsContent = `export const ComponentsSchemas = ${JSON.stringify(buildComponentsSchemas(), null, 2)} as const;\n`;
fs.writeFileSync(componentsOut, componentsContent, 'utf8');
console.log(`Generated: ${path.relative(process.cwd(), componentsOut)}`);
