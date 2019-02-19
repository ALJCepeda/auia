import { ConfigModel } from 'interfaces';
import { Group } from './Group';
import { RepositoryInstance } from './RepositoryInstance';

export interface UserConfig {
  name:string;
  repositories:string[];
  groups:string[];
}

export class User implements ConfigModel {
  public static classOf(model:ConfigModel): model is User {
    return model.class() === User;
  }

  public repositories:Map<string, RepositoryInstance> = new Map();
  public groups:Map<string, Group> = new Map();

  constructor(public id: string, public config:UserConfig) {}

  public class() {
    return User;
  }

  public getSpecs() {
    return [];
  }
}
