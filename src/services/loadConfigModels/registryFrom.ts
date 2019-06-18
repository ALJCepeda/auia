import { Registry } from '../../models/Registry';
import { addData } from './addData';

export function registryFrom(data:any): Registry {
  console.debug('Loading data into registry');
  const configRegistry = new Registry();

  for(const key in data) {
    if(data.hasOwnProperty(key)) {
      addData(key, data, configRegistry);
    }
  }

  return configRegistry;
}
