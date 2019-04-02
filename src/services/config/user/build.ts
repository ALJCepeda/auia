import { GroupUser } from '../../../entities/GroupUser';
import { Resource } from '../../../entities/Resource';
import { User } from '../../../entities/User';
import { UserRepository } from '../../../entities/UserRepository';
import { Registry } from '../../../models/Registry';

export function build(models:Resource[], config:Registry): Resource[] {
  return models.map((model) => _build(model, config));
}

function _build(model:Resource, config:Registry):Resource {
  if(model.type !== User.type) {
    throw new Error(`Model is not instance of User: ${model}`);
  }
  
  const user:User = model as User;
  user.repositories = [];
  user.groups = [];
  
  const { repositories, groups } = user.data;
  
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
  
  return user;
}
