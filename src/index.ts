import { loadConfig, loadSchema } from './utils';
import * as AJV from 'ajv';
import { parseConfig } from 'services';

const config = loadConfig();
const schema = loadSchema();

const ajv = new AJV();
const validate = ajv.compile(schema);

if (!validate(config)) {
  throw validate.errors;
}

const configuration = parseConfig(config);
console.log(configuration);
