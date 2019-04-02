import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as AJV from 'AJV';
import { Registry } from '../../models/Registry';
import { HandlerDict } from '../config/HandlerDict';

export function loadConfigModels(): Registry {
  console.debug('Building model configurations');
  const config = readConfig();
  validateConfig(config);
  
  const configRegistry = parseConfig(config);
  buildModels(configRegistry);
  console.debug('Registry ready');
  return configRegistry;
}

function validateConfig(config:Registry) {
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

function addData(key:string, data:any,  configRegistry:Registry):void {
  const handler = HandlerDict.get(key);
  if(!handler) {
    throw new Error(`No handler found for root key: ${key}`);
  }
  
  const result = handler.create(data[key]);
  configRegistry.add(result);
}

function parseConfig(data:any): Registry {
  console.debug('Loading data into registry');
  const configRegistry = new Registry();
  
  for(const key in data) {
    if(data.hasOwnProperty(key)) {
      addData(key, data, configRegistry);
    }
  }
  
  return configRegistry;
}

function readConfig() {
  const configFile = process.argv[2];
  
  if(!configFile) {
    throw new Error('Must include a registry file');
  }
  
  console.log(`Loaded config file: ${configFile}`);
  return yaml.load(fs.readFileSync(configFile, 'utf8'));
}

function buildModels(configuration:Registry): Registry {
  console.debug('Building models from registry');
  configuration.models().forEach((model) => {
    const handler = HandlerDict.get(model.type);
    handler.build([ model ], configuration);
  });
  console.log('Models built from registry');
  return configuration;
}
