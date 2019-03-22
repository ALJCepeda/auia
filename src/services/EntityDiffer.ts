import { BaseEntity } from 'entities';
import { EntityChange, EntityChangeConstructor } from './change';

export class EntityDiffer<ModelT extends BaseEntity> {
  constructor(
    public changeList: EntityChangeConstructor<ModelT>[]
  ) { }

  public async diff(configModel?: ModelT, entityModel?:ModelT): Promise<Array<EntityChange<ModelT>>> {
    const changes:Array<EntityChange<ModelT>> = this.changeList.map((changeCTR) => new changeCTR());
    const changeChecks:Array<Promise<EntityChange<ModelT>>> = changes.map((change) => change.check(configModel, entityModel));
    return Promise.all(changeChecks);
  }
}
