import * as fs from 'fs';
import * as yaml from 'js-yaml';

export function readConfig(configFile:string) {
  console.log(`Loading config file: ${configFile}`);
  return yaml.load(fs.readFileSync(configFile, 'utf8'));
}
