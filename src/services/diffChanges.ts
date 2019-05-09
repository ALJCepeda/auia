import { ResourceChange, ResourceChangeCTR } from '../entities/ResourceChange';
import { Resource } from '../entities/Resource';

export function diffChanges<ModelT extends Resource = Resource>(changeList: ResourceChangeCTR<ModelT>[], configModel:ModelT, entityModel:ModelT): ResourceChange<ModelT>[] {
  return changeList.map((changeCTR) => new changeCTR())
    .map((change) => change.check(configModel, entityModel));
}
