import { User } from "./User";
import { Group } from "./Group";
import { RDBMS } from "./RDBMS";
import { Repository } from "./Repository";
import { ConfigModel } from "./ConfigModel";

export class Configuration {
  public users:User[] = [];
  public groups:Group[] = [];
  public rdbms:RDBMS[] = [];
  public repos:Repository[] = [];

  add(models:ConfigModel[]) {
    models.forEach(model => {
      if(model instanceof Repository) {
        this.repos.push(model);
      }

      if(model instanceof RDBMS) {
        this.rdbms.push(model);
      }

      if(model instanceof Group) {
        this.groups.push(model);
      }

      if(model instanceof User) {
        this.users.push(model);
      }
    })
  }
}
