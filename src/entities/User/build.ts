import { GroupUser } from '../GroupUser/GroupUser';
import { Resource } from '../Resource';
import { User } from './User';
import { UserRepository } from '../UserRepository/UserRepository';
import { Registry } from '../../models/Registry';

export function build(models:Resource[], config:Registry): User[] {
  return models.map((model) => _build(model, config));
}

function buildRepositoryRelations(user:User, config:Registry) {
  if(!user.data) {
    throw new Error('All objects originating from configurations must have a data model');
  }
  
  const repositories = user.data.repositories;
  user.repositories = [];
  
  if(repositories) {
    if (!Array.isArray(repositories)) {
      throw new Error(`Repositories for user (${user.id} must be an array of repository ids or UserRepository objects`);
    } else {
      repositories.forEach((repositoryID: string) => {
        const repository = config.repositoryMap.get(repositoryID) ;
        if (!repository) {
          console.warn(`Undefined repository encountered (${repositoryID}) for user (${user.id})`);
        } else {
          const repositoryInstance = new UserRepository();
          repositoryInstance.user = user;
          repositoryInstance.repository = repository;
          
          // @ts-ignore
          user.repositories.push(repositoryInstance);
          user.repositoryMap.set(repositoryID, repositoryInstance);
        }
      });
    }
  }
}

function buildGroupRelations(user:User, config:Registry) {
  if(!user.data) {
    throw new Error('All objects originating from configurations must have a data model');
  }
  
  const groups = user.data.groups;
  user.groups = [];
  
  if(groups) {
    if(!Array.isArray(groups)) {
      throw new Error(`Groups for user (${user.id}) must be an array of repository ids or UserGroup objects`);
    } else {
      groups.forEach((groupID:string) => {
        const group = config.groupMap.get(groupID);
        if(!group) {
          console.warn(`Undefined group encountered (${groupID}) for user(${user.id})`);
        } else {
          const groupMembership = new GroupUser();
          groupMembership.user = user;
          groupMembership.group = group;
          
          // @ts-ignore
          user.groups.push(groupMembership);
          user.groupMap.set(groupID, groupMembership);
        }
      });
    }
  }
}
function _build(model:Resource, config:Registry):User {
  if(model.type !== User.type) {
    throw new Error(`Model is not instance of User: ${model}`);
  }
  
  const user:User = model as User;
  
  buildRepositoryRelations(user, config);
  buildGroupRelations(user, config);
  
  return user;
}
