import { LessThanOrEqual, Repository } from 'typeorm';
import { DBResourceChange, ResourceChangeCTR } from '../entities/changes/ResourceChange';
import { Resource } from '../entities/Resource';


export class Aggregate<TModel extends Resource> {
  public changes:DBResourceChange[] = [];

  constructor(
    public model: TModel,
    public repository: Repository<DBResourceChange>,
    public changeMap: Map<string, ResourceChangeCTR<TModel>>
  ) { }

  public async getChanges(before:Date = new Date()): Promise<Array<DBResourceChange>> {
    return this.repository.find( { target:this.model.name, createdAt: LessThanOrEqual(before) });
  }

  public async build(before:Date = new Date()): Promise<TModel | undefined> {
    const changes = await this.getChanges(before);
    this.model = this.play(changes);
    return this.model;
  }

  public play(changes:DBResourceChange[]): TModel{
    let model: TModel = this.model;

    changes.forEach((change) => {
      if (!this.changeMap.has(change.name)) {
        throw new Error(`Encountered unresolved User change ${change.name}`);
      }

      const ctr: ResourceChangeCTR<TModel> = this.changeMap.get(change.name) as ResourceChangeCTR<TModel>;
      const changeInst = new ctr();
      model = changeInst.update(model, change);
      this.changes.push(change);

      if(!model) {
        throw new Error('Unable to continue playing events, change did not return a model');
      }
    });

    this.model = model;
    return model;
  }
}
