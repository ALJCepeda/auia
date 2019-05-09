import { Repository } from './Repository';
import { Resource } from '../Resource';
import { Registry } from '../../models/Registry';

export function build(models:Resource[], config:Registry): Repository[] {
  return models.map((model) => _build(model, config));
}

function _build(model:Resource, config:Registry):Repository {
  if(model.type !== Repository.type) {
    throw new Error(`Model is not instance of Repository: ${model}`);
  }

  return model as Repository;
}
