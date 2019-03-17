import { LessThanOrEqual, Repository } from 'typeorm';

import { EntityModel, ModelChanges } from '../abstract';

export abstract class Aggregate<TModel extends EntityModel> {
  public model?: TModel;
  public changes:Array<ModelChanges<TModel>> = [];

  constructor(
    public id: string,
    public repository: Repository<ModelChanges<TModel>>
  ) { }

  public async getChanges(before:Date = new Date()): Promise<Array<ModelChanges<TModel>>> {
    return this.repository.find( { id:this.id, createdAt: LessThanOrEqual(before) });
  }

  public async build(before:Date = new Date()): Promise<TModel> {
    const changes = await this.getChanges(before);
    this.model = this.replay(changes);
    return this.model;
  }

  public abstract replay(changes:Array<ModelChanges<TModel>>): TModel;
}
