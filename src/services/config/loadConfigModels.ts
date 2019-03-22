import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as AJV from 'AJV';

import { Configuration } from 'models';
import { getConfigHandler } from '../handlers/config';

export function loadConfigModels(): Configuration {
  console.debug('Building model configurations');
  const config = readConfig();
  validateConfig(config);
  
  const configuration = parseConfig(config);
  buildModels(configuration);
  console.debug('Configuration ready');
  return configuration;
}

function validateConfig(config:Configuration) {
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

function addData(key:string, data:any,  configuration:Configuration):void {
  const handler = getConfigHandler(key);
  if(!handler) {
    throw new Error(`No handler found for root key: ${key}`);
  }
  
  const result = handler.create(data[key]);
  configuration.add(result);
}

function parseConfig(data:any): Configuration {
  console.debug('Loading data from config');
  const configuration = new Configuration();
  
  for(const key in data) {
    if(data.hasOwnProperty(key)) {
      addData(key, data, configuration);
    }
  }
  
  return configuration;
}

function readConfig() {
  const configFile = process.argv[2];
  
  if(!configFile) {
    throw new Error('Must include a config file');
  }
  
  console.log(`Loaded config file: ${configFile}`);
  return yaml.load(fs.readFileSync(configFile, 'utf8'));
}

function buildModels(configuration:Configuration): Configuration {
  console.debug('Building models from config');
  configuration.models().forEach((model) => {
    const handler = getConfigHandler(model);
    handler.build([ model ], configuration);
  });
  console.log('Models built from config');
  return configuration;
}
