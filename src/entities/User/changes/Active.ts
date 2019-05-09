import { IDBResourceChange } from '../../ResourceChange';
import { UserChange } from './UserChange';
import { User } from '../User';

export class Active extends UserChange {
  public check(configUser:User, dbUser:User): UserChange {
    if(configUser.active !== dbUser.active) {
      this.target = configUser.name;
      this.payload = String(configUser.active);
      this.pending = true;
    }

    return this;
  }

  public update(change:IDBResourceChange, user:User): User {
    return Object.assign(new User(), user, {
      active: change.payload === 'true',
      lastModifiedAt: change.createdAt
    });
  }
}
