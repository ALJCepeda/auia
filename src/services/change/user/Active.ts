import { IDBResourceChange } from '../../../entities/changes/ResourceChange';
import { UserChange } from '../../../entities/changes/UserChange';
import { User } from '../../../entities/User';

export class Active extends UserChange {
  public check(configUser:User, dbUser:User): UserChange {
    debugger;
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
