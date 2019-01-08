import { RepositoryInstance } from "./RepositoryInstance";
import { Group } from "./Group";
import { ConfigModel } from "./ConfigModel";


export class User extends ConfigModel{
  public repositories:RepositoryInstance[] = [];
  public groups:Group[] = [];

  constructor(public name:string) {
    super();
  }
}
