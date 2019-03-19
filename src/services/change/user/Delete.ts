import { Change } from 'interfaces';
import { DBEntityChange } from 'abstract';
import { User } from 'entities';

export class Delete extends Change<User> {
  public async check(configUser?:User, dbUser?:User): Promise<Change<User>> {
    if(dbUser && !configUser) {
      this.payload = dbUser.name;
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
