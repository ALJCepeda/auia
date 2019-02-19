import { ConfigModel } from 'interfaces';
import { Configuration } from './Configuration';
import { Group } from './Group';
import { RepositoryInstance } from './RepositoryInstance';

export interface UserConfig {
  name:string;
  repositories:string[];
  groups:string[];
}

export class User implements ConfigModel {
  public static fromConfig(config: UserConfig): User {
    return new User(config.name, config);
  }

  public repositories:Map<string, RepositoryInstance> = new Map();
  public groups:Map<string, Group> = new Map();

  constructor(public id: string, public config:UserConfig) {}

  public class() { return 'User'; }
  public getSpecs() {
    return [];
  }

  public buildFrom(configuration:Configuration): User {
    if(this.config.repositories) {
      if (!Array.isArray(this.config.repositories)) {
        throw new Error(`Repositories for user (${this.id} must be an array of repository ids or UserRepository objects`);
      } else {
        this.config.repositories.forEach((repositoryID: string) => {
          const repository = configuration.repositories.get(repositoryID);
          if (!repository) {
            console.warn(`Undefined repository encountered (${repositoryID}) for user (${this.id})`);
          } else {
            const repositoryInstance = new RepositoryInstance(repository);
            this.repositories.set(repositoryID, repositoryInstance);
          }
        });
      }
    }

    this.config.groups.forEach((groupID:string) => {
      const group = configuration.groups.get(groupID);
      if(!group) {
        console.warn(`Undefined group encountered (${groupID}) for user(${this.id})`);
      } else {
        this.groups.set(groupID, group);
      }
    });

    return this;
  }
}
