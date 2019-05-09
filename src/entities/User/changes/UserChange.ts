import { ResourceChange } from '../../ResourceChange';
import { User } from '../User';

export abstract class UserChange extends ResourceChange<User> {
  public static get type():string {
    return User.type;
  }
  
  public get type():string {
    return User.type;
  };
}
