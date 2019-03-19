import { LessThanOrEqual, Repository } from 'typeorm';

import { ChangeConstructor } from '../interfaces';
import { BaseEntity } from '../abstract/BaseEntity';
import { EntityChange } from '../abstract/EntityChange';

export class Aggregate<TModel extends BaseEntity> {
  public model?: TModel;
  public changes:Array<EntityChange<TModel>> = [];

  constructor(
    public target: string,
    public repository: Repository<EntityChange<TModel>>,
    public changeMap: Map<string, ChangeConstructor<TModel>>
  ) { }

  public async getChanges(before:Date = new Date()): Promise<Array<EntityChange<TModel>>> {
    return this.repository.find( { target:this.target, createdAt: LessThanOrEqual(before) });
  }

  public async build(before:Date = new Date()): Promise<TModel | undefined> {
    const changes = await this.getChanges(before);
    this.model = this.play(changes);
    return this.model;
  }

  public play(changes:EntityChange<TModel>[]): TModel | undefined {
    let model: TModel | undefined;

    changes.forEach((change) => {
      if (!this.changeMap.has(change.type)) {
        throw new Error(`Encountered unresolved User change ${change.type}`);
      }

      const ctr: ChangeConstructor<TModel> = this.changeMap.get(change.type) as ChangeConstructor<TModel>;
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
