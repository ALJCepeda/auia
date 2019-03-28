import { Group } from '../entities/Group';
import { Repository } from '../entities/Repository';
import { Resource, ResourceCTR } from '../entities/Resource';
import { User } from '../entities/User';

export class Registry {
  public get users() {
    return this.maps.get(User) as Map<string, User>;
  }

  public get groups() {
    return this.maps.get(User) as Map<string, Group>;
  }

  public get repositories() {
    return this.maps.get(Repository) as Map<string, Repository>;
  }

  private maps:Map<ResourceCTR, Map<string, Resource>> = new Map<ResourceCTR, Map<string, Resource>>([
    [ Group, new Map<string, Group>() ],
    [ Repository, new Map<string, Repository>() ],
    [ User, new Map<string, User>() ]
  ]);

  public models():Resource[] {
    const result:Resource[] = [];

    this.maps.forEach((map) => {
      map.forEach((model) => {
        result.push(model);
      });
    });

    return result;
  }

  public add(models: Resource[]): Registry {
    models.forEach((model) => this._add(model));
    return this;
  }

  protected _add(model: Resource): void {
    const ctr = model.constructor as ResourceCTR;

    if(!this.maps.has(ctr)) {
      throw new Error(`There is no map for class: ${ctr}`);
    } else {
      const map = this.maps.get(ctr);

      if(!map) {
        throw new Error(`Invalid class provided to configuration: ${ctr}`);
      }

      if(map.has(model.name)) {
        throw new Error(`Duplicate model (${ctr}) encountered for: ${model.name}`);
      }

      map.set(model.name, model);
    }
  }
}
