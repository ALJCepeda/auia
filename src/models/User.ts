import { RepositoryInstance } from "./RepositoryInstance";


export class User{
  public repositories:RepositoryInstance[] = [];

  constructor(public name:string, public password:string) {
    this.name = name;
  }
}
