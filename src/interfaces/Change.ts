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

export interface ChangeDiffer<Model extends BaseEntity> {
  configModel?: Model;
  entityModel?: Model;

  diff(): Promise<Changes<Model>>;
}

export class Changes<Model extends BaseEntity> {
  public get length():number {
    return this.changes.length;
  }

  constructor(
    public model:Model | undefined,
    public changes: Array<Change<Model>>
  ) {}

  public getPendingChanges(): Changes<Model> {
    const pendingChanges = this.changes.filter((change) => change.pending);
    return new Changes(this.model, pendingChanges);
  }
}
