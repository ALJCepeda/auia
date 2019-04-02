import { Group } from '../entities/Group';
import { Repository } from '../entities/Repository';
import { Resource } from '../entities/Resource';
import { User } from '../entities/User';

export class Registry {
  public get users(): User[] {
    return Array.from(this.userMap.values());
  }

  public get groups(): Group[] {
    return Array.from(this.groupMap.values());
  }
  
  public get repositories(): Repository[] {
    return Array.from(this.repositoryMap.values());
  }

  public maps:Map<string, Map<string, Resource>> = new Map<string, Map<string, Resource>>([
    [ Group.type, new Map<string, Group>() ],
    [ Repository.type, new Map<string, Repository>() ],
    [ User.type, new Map<string, User>() ]
  ]);
  
  public get repositoryMap() {
    return this.maps.get(Repository.type) as Map<string, Repository>;
  }
  
  public get groupMap() {
    return this.maps.get(Group.type) as Map<string, Group>;
  }
  
  public get userMap() {
    return this.maps.get(User.type) as Map<string, User>;
  }
  
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
  
  public getMap(type:string) {
    if(!this.maps.has(type)) {
      throw new Error(`There is no map for class: ${type}`);
    }
    
    return this.maps.get(type) as Map<string, Resource>;
  }

  protected _add(model: Resource):void {
    const map = this.getMap(model.type);

    if(map.has(model.name)) {
      throw new Error(`Duplicate model (${model.type}) encountered for: ${model.name}`);
    }

    map.set(model.name, model);
  }
  
  public upsert(models: Resource[]):void {
    models.forEach((model) => this._upsert(model));
  }
  
  protected _upsert(model: Resource):void {
    this.getMap(model.type).set(model.name, model);
  }
}
