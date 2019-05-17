import { Registry } from '../../models/Registry';
import { associate } from '../../services/associate';
import { GroupUser } from '../GroupUser/GroupUser';
import { Resource } from '../Resource';
import { UserRepository } from '../UserRepository/UserRepository';
import { User } from './User';

export function build(models:Resource[], config:Registry): User[] {
  return models.map((model) => {
    if(model.type !== User.type) {
      throw new Error(`Model is not instance of User: ${model}`);
    }
  
    const user:User = model as User;
  
    associate(user, config.repositoryMap, {
      dataKey:'repositories',
      associateClass: UserRepository
    });
    associate(user, config.groupMap, {
      dataKey: 'repositories',
      associateClass: GroupUser
    });
  
    return user;
  });
}
