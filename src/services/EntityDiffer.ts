import { ResourceChange, ResourceChangeCTR } from '../entities/changes/ResourceChange';
import { Resource } from '../entities/Resource';

export class EntityDiffer<ModelT extends Resource> {
  constructor(
    public changeList: ResourceChangeCTR<ModelT>[]
  ) { }

  public async diff(configModel?: ModelT, entityModel?:ModelT): Promise<Array<ResourceChange<ModelT>>> {
    const changes:Array<ResourceChange<ModelT>> = this.changeList.map((changeCTR) => new changeCTR());
    const changeChecks:Array<Promise<ResourceChange<ModelT>>> = changes.map((change) => change.check(configModel, entityModel));
    return Promise.all(changeChecks);
  }
}
