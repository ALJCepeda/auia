import { ConfigModel } from './ConfigModel';

export interface ModelChangeConstructor<Payload, Model extends ConfigModel> {
  new (): ModelChange<Payload, Model>;
}

export abstract class ModelChange<Payload, Model extends ConfigModel> {
  public id: string = this.constructor.name;
  public pending: Boolean = false;
  public payload?: Payload;

  public abstract check(configModel?:Model, dbModel?: Model): Promise<ModelChange<Payload, Model>>;
}

export interface ModelChangeDiffer<Model extends ConfigModel> {
  configModel?: Model;
  dbModel?: Model;

  diff(): Promise<ModelChanges<Model>>;
}

export class ModelChanges<Model extends ConfigModel> {
  constructor(
    public model:Model | undefined,
    public changes: Array<ModelChange<any, Model>>
  ) {}

  public getPendingChanges(): Array<ModelChange<any, Model>> {
    return this.changes.filter((change) => change.pending);
  }
}
