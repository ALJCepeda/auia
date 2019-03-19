import { BaseEntity, DBEntityChange } from 'abstract';

export interface ChangeConstructor<Model extends BaseEntity> {
  new (): Change<Model>;
}

export abstract class Change<Model extends BaseEntity> {
  public type: string = this.constructor.name;
  public pending: Boolean = false;
  public payload:string = 'N/A';

  public abstract check(configModel?:Model, entityModel?: Model): Promise<Change<Model>>;
  public abstract update(model:Model | undefined, change:DBEntityChange): Model;
}
