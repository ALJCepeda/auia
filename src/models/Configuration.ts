import { BaseEntity } from '../abstract';
import { Group, Repository, User } from './entities';

export class Configuration {
  public get users() {
    return this.maps.get('User') as Map<string, User>;
  }

  public get groups() {
    return this.maps.get('Group') as Map<string, Group>;
  }

  public get repositories() {
    return this.maps.get('Repository') as Map<string, Repository>;
  }

  private maps:Map<string, Map<string, BaseEntity>> = new Map<string, Map<string, BaseEntity>>([
    [ 'Group', new Map<string, Group>() ],
    [ 'Repository', new Map<string, Repository>() ],
    [ 'User', new Map<string, User>() ]
  ]);

  public models():BaseEntity[] {
    const result:BaseEntity[] = [];

    this.maps.forEach((map) => {
      map.forEach((model) => {
        result.push(model);
      });
    });

    return result;
  }

  public add(models: BaseEntity[]): Configuration {
    models.forEach((model) => this._add(model));
    return this;
  }

  protected _add(model: BaseEntity): void {
    const className = model.class();

    if(!this.maps.has(className)) {
      throw new Error(`There is no map for class: ${className}`);
    } else {
      const map = this.maps.get(className);

      if(!map) {
        throw new Error(`Invalid class provided to configuration: ${className}`);
      }

      if(map.has(model.id)) {
        throw new Error(`Duplicate model (${className}) encountered for: ${model.id}`);
      }

      map.set(model.id, model);
    }
  }
}
