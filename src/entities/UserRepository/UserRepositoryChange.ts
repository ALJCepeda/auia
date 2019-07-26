import { ResourceChange } from '../ResourceChange';
import { UserRepository } from './UserRepository';

export abstract class UserRepositoryChange extends ResourceChange<UserRepository> {
  public static get type():string {
    return UserRepository.type;
  }

  public get type():string {
    return UserRepository.type;
  }
}
