import { DBResourceChange } from '../../../entities/changes/ResourceChange';
import { UserChange } from '../../../entities/changes/UserChange';
import { User } from '../../../entities/User';

export class Active extends UserChange {
  public check(configUser?:User, dbUser?:User): UserChange {
    if(dbUser) {
      this.target = dbUser.name;
      if(!configUser || (!configUser.active && dbUser.active)) {
        this.payload = '0';
        this.pending = true;
      }
      
      if(configUser && configUser.active && !dbUser.active) {
        this.payload = '1';
        this.pending = true;
      }
    }

    return this;
  }

  public update(change:DBResourceChange, user?:User): User {
    return Object.assign(new User(), user, {
      active: Boolean(change.payload)
    });
  }
}
