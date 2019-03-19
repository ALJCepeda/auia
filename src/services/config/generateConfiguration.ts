import { Configuration } from '../../models';
import { loadConfig } from './loadConfig';
import { validateConfig } from './validateConfig';
import { parseConfig } from './parseConfig';

export function generateConfiguration(): Configuration {
  const config = loadConfig();
  validateConfig(config);

  const configuration = parseConfig(config);
  console.debug('Configuration formalized');
  return configuration;
}
