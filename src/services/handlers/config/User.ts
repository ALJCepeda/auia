import { ConfigModel } from 'interfaces';
import { Configuration, RepositoryInstance, User } from 'models';
import { ConfigHandler } from './ConfigHandler';

function _build(model:ConfigModel, config:Configuration):ConfigModel {
  if(model.class() !== User) {
    throw new Error(`Model is not instance of User: ${model}`);
  }

  const user:User = model as User;

  if(user.config.repositories) {
    if (!Array.isArray(user.config.repositories)) {
      throw new Error(`Repositories for user (${user.id} must be an array of repository ids or UserRepository objects`);
    } else {
      user.config.repositories.forEach((repositoryID: string) => {
        const repository = config.repositories.get(repositoryID);
        if (!repository) {
          console.warn(`Undefined repository encountered (${repositoryID}) for user (${user.id})`);
        } else {
          const repositoryInstance = new RepositoryInstance(repository);
          user.repositories.set(repositoryID, repositoryInstance);
        }
      });
    }
  }

  if(user.config.groups) {
    if(!Array.isArray(user.config.groups)) {
      throw new Error(`Groups for user (${user.id}) must be an array of repository ids or UserGroup objects`);
    } else {
      user.config.groups.forEach((groupID:string) => {
        const group = config.groups.get(groupID);
        if(!group) {
          console.warn(`Undefined group encountered (${groupID}) for user(${user.id})`);
        } else {
          user.groups.set(groupID, group);
        }
      });
    }
  }

  return user;
}

export const UserConfig:ConfigHandler = {
  build:(models:ConfigModel[], config:Configuration): ConfigModel[] => {
    return models.map((model) => _build(model, config));
  },

  create:(datas:any[]): ConfigModel[] => {
    return datas.map((data) => new User(data.name, data));
  }
};
