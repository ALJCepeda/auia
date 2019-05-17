import { Registry } from '../../models/Registry';
import { HandlerDict } from '../dictionaries/HandlerDict';

export function associateModels(configuration:Registry): Registry {
  console.debug('Associating models in registry');
  configuration.models().forEach((model) => {
    const handler = HandlerDict.get(model.type);
    handler.associate([ model ], configuration);
  });
  console.log('All models associated');
  return configuration;
}
