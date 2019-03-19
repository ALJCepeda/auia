import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as AJV from 'ajv';
import { Configuration } from 'models';

export function validateConfig(config:Configuration) {
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
