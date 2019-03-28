import { DBResourceChange } from '../../../entities/changes/ResourceChange';
import { UserChange } from '../../../entities/changes/UserChange';
import { User } from '../../../entities/User';

export class Delete extends UserChange {
  public async check(configUser?:User, dbUser?:User): Promise<UserChange> {
    if(dbUser && !configUser) {
      this.target = dbUser.name;
      this.pending = true;
    }

    return this;
  }

  public update(user:User, change:DBResourceChange): User {
    return Object.assign(new User(), user, {
      created: false,
      deleted: true
    });
  }
}
