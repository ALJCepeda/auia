import { LessThanOrEqual, Repository } from 'typeorm';

import { ConfigModel } from '../records';
import { ModelChanges } from '../records/changes';

export abstract class Aggregate<TModel extends ConfigModel> {
  public model?: TModel;
  public changes:Array<ModelChanges<TModel>> = [];

  constructor(
    public id: string,
    public repositories: { [key:string]: Repository<ModelChanges<TModel>> }
  ) {
    if(!this.repositories.model) {
      throw new Error('All aggregates must have a repository for the model they encapsulate');
    }
  }

  public async getChanges(before:Date = new Date()): Promise<Array<ModelChanges<TModel>>> {
    return this.repositories.model.find( { id:this.id, createdAt: LessThanOrEqual(before) });
  }

  public async build(before:Date = new Date()): Promise<TModel> {
    const changes = await this.getChanges(before);
    this.model = this.replay(changes);
    return this.model;
  }

  public abstract replay(changes:Array<ModelChanges<TModel>>): TModel;
}
