import { BaseEntity, DBEntityChange } from 'abstract';

export interface EntityChangeConstructor<Model extends BaseEntity> {
  new (): EntityChange<Model>;
}

export abstract class EntityChange<Model extends BaseEntity> {
  public type: string = this.constructor.name;
  public pending: Boolean = false;
  public payload:string = 'N/A';

  public abstract check(configModel?:Model, entityModel?: Model): Promise<EntityChange<Model>>;
  public abstract update(model:Model | undefined, change:DBEntityChange): Model;
}
