import * as fs from 'fs';
import * as yaml from 'js-yaml';

export function loadConfig() {
  const configFile = process.argv[2];

  if(!configFile) {
    throw new Error('Must include a config file');
  }

  console.log(`Using config file: ${configFile}`);
  return yaml.load(fs.readFileSync(configFile, 'utf8'));
}

export function loadSchema() {
  return yaml.load(fs.readFileSync('src/schema.yaml', 'utf8'));
}
