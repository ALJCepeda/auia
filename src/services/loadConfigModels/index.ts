import { Registry } from '../../models/Registry';
import { associateModels } from './associateModels';
import { registryFrom } from './registryFrom';
import { readConfig } from './readConfig';
import { validateConfig } from './validateConfig';

export function loadConfigModals(configFile:string): Registry {
  console.debug('Building model configurations');
  const config = readConfig(configFile);
  validateConfig(config);
  
  const configRegistry = registryFrom(config);
  associateModels(configRegistry);
  console.debug('Registry ready');
  return configRegistry;
}
