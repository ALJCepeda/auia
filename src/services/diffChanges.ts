import { Resource } from '../entities/Resource';
import { ResourceChange, ResourceChangeCTR } from '../entities/ResourceChange';

export function diffChanges<ModelT extends Resource = Resource>(changeList: Array<ResourceChangeCTR<ModelT>>, configModel:ModelT, entityModel:ModelT): Array<ResourceChange<ModelT>> {
  return changeList.map((changeCTR) => new changeCTR())
    .map((change) => change.check(configModel, entityModel));
}
