import { LessThanOrEqual, Repository } from 'typeorm';

import { BaseEntity } from 'entities';
import { DBEntityChange, EntityChangeConstructor } from 'services';

export class Aggregate<TModel extends BaseEntity> {
  public changes:DBEntityChange[] = [];

  constructor(
    public model: TModel,
    public repository: Repository<DBEntityChange>,
    public changeMap: Map<string, EntityChangeConstructor<TModel>>
  ) { }

  public async getChanges(before:Date = new Date()): Promise<Array<DBEntityChange>> {
    return this.repository.find( { target:this.model.name, createdAt: LessThanOrEqual(before) });
  }

  public async build(before:Date = new Date()): Promise<TModel | undefined> {
    const changes = await this.getChanges(before);
    this.model = this.play(changes);
    return this.model;
  }

  public play(changes:DBEntityChange[]): TModel{
    let model: TModel = this.model;

    changes.forEach((change) => {
      if (!this.changeMap.has(change.name)) {
        throw new Error(`Encountered unresolved User change ${change.name}`);
      }

      const ctr: EntityChangeConstructor<TModel> = this.changeMap.get(change.name) as EntityChangeConstructor<TModel>;
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
