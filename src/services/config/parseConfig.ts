import { Configuration } from 'models';
import { getConfigHandler } from '../handlers/config';

function addData(key:string, data:any,  configuration:Configuration):void {
  const handler = getConfigHandler(key);
  if(!handler) {
    throw new Error(`No handler found for root key: ${key}`);
  }

  const result = handler.create(data[key]);
  configuration.add(result);
}

function buildModels(configuration:Configuration): Configuration {
  configuration.models().forEach((model) => {
    const handler = getConfigHandler(model);
    handler.build([ model ], configuration);
  });

  return configuration;
}

export function parseConfig(data:any): Configuration {
  const configuration = new Configuration();

  for(const key in data) {
    if(data.hasOwnProperty(key)) {
      addData(key, data, configuration);
    }
  }

  return buildModels(configuration);
}
