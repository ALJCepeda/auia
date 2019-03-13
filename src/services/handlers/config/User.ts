import { ConfigModel } from 'interfaces';
import { Configuration, GroupMembership, RepositoryInstance, User } from 'models';
import { ConfigHandler } from './ConfigHandler';

function _build(model:ConfigModel, config:Configuration):ConfigModel {
  if(model.class() !== 'User') {
    throw new Error(`Model is not instance of User: ${model}`);
  }

  const user:User = model as User;
  user.repositoryInstances = [];
  user.groupMemberships = [];

  const { repositories, groups } = user.data;

  if(repositories) {
    if (!Array.isArray(repositories)) {
      throw new Error(`Repositories for user (${user.id} must be an array of repository ids or UserRepository objects`);
    } else {
      repositories.forEach((repositoryID: string) => {
        const repository = config.repositories.get(repositoryID);
        if (!repository) {
          console.warn(`Undefined repository encountered (${repositoryID}) for user (${user.id})`);
        } else {
          const repositoryInstance = new RepositoryInstance(user, repository, {});

          // @ts-ignore
          user.repositoryInstances.push(repositoryInstance);
          user.repositoryInstanceMap.set(repositoryID, repositoryInstance);
        }
      });
    }
  }

  if(groups) {
    if(!Array.isArray(groups)) {
      throw new Error(`Groups for user (${user.id}) must be an array of repository ids or UserGroup objects`);
    } else {
     groups.forEach((groupID:string) => {
        const group = config.groups.get(groupID);
        if(!group) {
          console.warn(`Undefined group encountered (${groupID}) for user(${user.id})`);
        } else {
          const groupMembership = new GroupMembership(user, group, {});

          // @ts-ignore
          user.groupMemberships.push(groupMembership);
          user.groupMembershipMap.set(groupID, groupMembership);
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

  create:(datum:any[]): ConfigModel[] => {
    return datum.map((data) => new User(data.name, data));
  }
};
