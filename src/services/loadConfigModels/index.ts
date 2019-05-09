import { Registry } from '../../models/Registry';
import { buildModels } from './buildModels';
import { parseConfig } from './parseConfig';
import { readConfig } from './readConfig';
import { validateConfig } from './validateConfig';

export function loadConfigModals(configFile:string): Registry {
  console.debug('Building model configurations');
  const config = readConfig(configFile);
  validateConfig(config);
  
  const configRegistry = parseConfig(config);
  buildModels(configRegistry);
  console.debug('Registry ready');
  return configRegistry;
}
