import { writeFileSync } from 'fs';

export default async function(id, folder, variables) {
  if (id.includes('index.html') === false) {
    return;
  }
  if (folder === undefined || folder === null) {
    return;
  }
  if (variables === undefined || variables === null) {
    return;
  }
  const output = Object.entries(variables)
    .map(([key, value]) => `$${key}: ${value};`)
    .join('\n');
  writeFileSync(`${folder}/variables.scss`, output);
}