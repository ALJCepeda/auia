import { ConfigModel } from 'interfaces';
import { Group } from './Group';
import { Repository } from './Repository';
import { User } from './User';

export class Configuration {
  public get users() {
    return this.maps.get(User) as Map<string, User>;
  }

  public get groups() {
    return this.maps.get(Group) as Map<string, Group>;
  }

  public get repositories() {
    return this.maps.get(Repository) as Map<string, Repository>;
  }

  private maps:Map<Function, Map<string, ConfigModel>> = new Map<Function, Map<string, ConfigModel>>([
    [ Group, new Map<string, Group>() ],
    [ Repository, new Map<string, Repository>() ],
    [ User, new Map<string, User>() ]
  ]);

  public models():ConfigModel[] {
    const result:ConfigModel[] = [];

    this.maps.forEach((map) => {
      map.forEach((model) => {
        result.push(model);
      });
    });

    return result;
  }

  public add(models: ConfigModel[]): Configuration {
    models.forEach((model) => this._add(model));
    return this;
  }

  protected _add(model: ConfigModel): void {
    const classConstructor = model.class();

    if(!this.maps.has(classConstructor)) {
      throw new Error(`THere is no map for class: ${classConstructor}`);
    } else {
      const map = this.maps.get(classConstructor);

      if(!map) {
        throw new Error(`Invalid class provided to configuration: ${classConstructor}`);
      }

      if(map.has(model.id)) {
        throw new Error(`Duplicate model (${classConstructor}) encountered for: ${model.id}`);
      }

      map.set(model.id, model);
    }
  }
}
