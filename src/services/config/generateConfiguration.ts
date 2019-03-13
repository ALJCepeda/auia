import * as AJV from 'ajv';
import { loadConfig } from './loadConfig';
import { loadSchema } from './loadSchema';
import { parseConfig } from './parseConfig';

export function generateConfiguration() {
  const config = loadConfig();
  const schema = loadSchema();

  const ajv = new AJV();
  const validate = ajv.compile(schema);

  if (!validate(config)) {
    throw validate.errors;
  }

  return parseConfig(config);
}
