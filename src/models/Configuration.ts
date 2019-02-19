import { ConfigModel } from 'interfaces';
import { Group } from './Group';
import { RDBMS } from './RDBMS';
import { Repository } from './Repository';
import { User } from './User';

export class Configuration {
  public users:Map<string, User> = new Map();
  public groups:Map<string, Group> = new Map();
  public rdbms:Map<string, RDBMS> = new Map();
  public repositories:Map<string, Repository> = new Map();

  private classToMap:{ [index:string]:Map<string, ConfigModel> } = {
    Group: this.groups,
    RDBMS: this.rdbms,
    Repository: this.repositories,
    User: this.users
  };

  public models() {
    let result = new Map();
    for(const key in this) {
      if(this.hasOwnProperty(key)) {
        const prop = this[key];

        if(prop instanceof Map) {
          result = new Map([ ...result, ...prop]);
        }
      }
    }

    return Array.from(result.values());
  }

  public add(models: ConfigModel[]): Configuration {
    models.forEach((model) => this._add(model));
    return this;
  }

  protected _add(model: ConfigModel): void {
    const className = model.class();
    const map = this.classToMap[className];

    if(!map) {
      throw new Error(`Invalid class provided to configuration: ${className}`);
    }

    if(map.has(model.id)) {
      throw new Error(`Duplicate model (${className}) encountered for: ${model.id}`);
    }

    map.set(model.id, model);
  }
}
