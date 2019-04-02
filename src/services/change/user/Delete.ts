import { DBResourceChange } from '../../../entities/changes/ResourceChange';
import { UserChange } from '../../../entities/changes/UserChange';
import { User } from '../../../entities/User';

export class Delete extends UserChange {
  public check(configUser?:User, dbUser?:User): UserChange {
    if(dbUser && !configUser) {
      this.target = dbUser.name;
      this.pending = true;
    }

    return this;
  }

  public update(change:DBResourceChange, user?:User): User {
    return Object.assign(new User(), user, {
      created: false,
      deleted: true
    });
  }
}
