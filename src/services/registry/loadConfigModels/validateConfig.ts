import * as fs from "fs";
import * as yaml from 'js-yaml';
import * as AJV from 'AJV';
import { Registry } from '../../../models/Registry';

export function validateConfig(config:Registry) {
  const schema =  yaml.load(fs.readFileSync('src/schema.yaml', 'utf8'));
  console.debug('Loaded schema');
  const ajv = new AJV();
  const validate = ajv.compile(schema);
  
  if (!validate(config)) {
    console.error('Config invalid!');
    throw validate.errors;
  }
  console.debug('Config valid');
  return schema;
}
