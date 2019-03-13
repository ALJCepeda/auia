import * as fs from 'fs';
import * as yaml from 'js-yaml';

export function loadSchema() {
  return yaml.load(fs.readFileSync('src/schema.yaml', 'utf8'));
}