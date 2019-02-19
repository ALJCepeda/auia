import { ConfigModel } from 'interfaces';
import { Group } from './Group';
import { RepositoryInstance } from './RepositoryInstance';

export interface UserData {
  name:string;
  repositories:string[];
  groups:string[];
}

export class User implements ConfigModel {
  public repositories:Map<string, RepositoryInstance> = new Map();
  public groups:Map<string, Group> = new Map();

  constructor(public id: string, public data:UserData) {}

  public class() {
    return User;
  }

  public getSpecs() {
    return [];
  }
}
