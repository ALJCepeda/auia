import { ResourceChange, ResourceChangeCTR } from '../entities/changes/ResourceChange';
import { Resource } from '../entities/Resource';

export class EntityDiffer<ModelT extends Resource = Resource> {
  constructor(
    public changeList: ResourceChangeCTR<ModelT>[]
  ) { }

  public diff(configModel: ModelT, entityModel:ModelT): ResourceChange<ModelT>[] {
    return this.changeList.map((changeCTR) => new changeCTR())
                          .map((change) => change.check(configModel, entityModel));
  }
}
