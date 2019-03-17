import { ConfigModel } from 'models';

export interface ChangeConstructor<Model extends ConfigModel> {
  new (): Change<Model>;
}

export abstract class Change<Model extends ConfigModel> {
  public id: string = this.constructor.name;
  public pending: Boolean = false;
  public payload:string = 'N/A';

  public abstract check(configModel?:Model, dbModel?: Model): Promise<Change<Model>>;
  public abstract update(model:Model | undefined, payload:string): Model;
}

export interface ChangeDiffer<Model extends ConfigModel> {
  configModel?: Model;
  dbModel?: Model;

  diff(): Promise<Changes<Model>>;
}

export class Changes<Model extends ConfigModel> {
  constructor(
    public model:Model | undefined,
    public changes: Array<Change<Model>>
  ) {}

  public getPendingChanges(): Array<Change<Model>> {
    return this.changes.filter((change) => change.pending);
  }
}
