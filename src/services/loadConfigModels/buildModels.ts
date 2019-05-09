import { Registry } from '../../models/Registry';
import { HandlerDict } from '../dictionaries/HandlerDict';

export function buildModels(configuration:Registry): Registry {
  console.debug('Building models from registry');
  configuration.models().forEach((model) => {
    const handler = HandlerDict.get(model.type);
    handler.build([ model ], configuration);
  });
  console.log('Models built from registry');
  return configuration;
}
