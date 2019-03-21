import { DBEntityChange } from 'abstract';
import { User, UserChange } from 'entities';

export class Delete extends UserChange {
  public async check(configUser?:User, dbUser?:User): Promise<UserChange> {
    if(dbUser && !configUser) {
      this.target = dbUser.name;
      this.pending = true;
    }

    return this;
  }

  public update(user:User, change:DBEntityChange): User {
    return Object.assign(new User(), user, {
      created: false,
      deleted: true
    });
  }
}
