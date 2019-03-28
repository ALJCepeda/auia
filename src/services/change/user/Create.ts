import { DBResourceChange } from '../../../entities/changes/ResourceChange';
import { UserChange } from '../../../entities/changes/UserChange';
import { User } from '../../../entities/User';

export class Create extends UserChange {
  public async check(configUser?:User, dbUser?:User): Promise<UserChange> {
    if(configUser && !dbUser) {
      this.target = configUser.name;
      this.payload = configUser.name;
      this.pending = true;
    }

    return this;
  }

  public update(user:User, change:DBResourceChange): User {
    const newUser = new User();
    newUser.name = change.payload;
    newUser.created = true;
    newUser.deleted = false;
    newUser.createdAt = change.createdAt;
    newUser.lastModifiedAt = change.createdAt;

    return newUser;
  }
}
