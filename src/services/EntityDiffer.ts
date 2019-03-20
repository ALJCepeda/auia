import { BaseEntity } from 'abstract';
import { EntityChange, EntityChangeConstructor } from 'interfaces';

export class EntityDiffer<ModelT extends BaseEntity> {
  constructor(
    public changeList: EntityChangeConstructor<ModelT>[]
  ) { }

  public async diff(configModel: ModelT | undefined, entityModel:ModelT | undefined): Promise<Array<EntityChange<ModelT>>> {
    const changes:Array<EntityChange<ModelT>> = this.changeList.map((changeCTR) => new changeCTR());
    const changeChecks:Array<Promise<EntityChange<ModelT>>> = changes.map((change) => change.check(configModel, entityModel));
    return Promise.all(changeChecks);
  }
}
