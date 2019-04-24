import * as AJV from 'AJV';
import { Registry } from '../../../models/Registry';
import { loadSchema } from './loadSchema';

export function validateConfig(config:Registry) {
  const schema = loadSchema('src/schema.yaml');
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
