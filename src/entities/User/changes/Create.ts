import { IDBResourceChange } from '../../ResourceChange';
import { UserChange } from './UserChange';
import { User } from '../User';

export class Create extends UserChange {
  public check(configUser:User, dbUser:User): UserChange {
    return this;
  }

  public update(change:IDBResourceChange, user:User): User {
    const newUser = new User();
    newUser.name = change.payload;
    newUser.createdAt = change.createdAt;
    newUser.lastModifiedAt = change.createdAt;
    newUser.active = true;

    return newUser;
  }
}
