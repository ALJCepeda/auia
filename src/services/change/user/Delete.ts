import { EntityChange } from 'interfaces';
import { DBEntityChange } from 'abstract';
import { User } from 'entities';

export class Delete extends EntityChange<User> {
  public async check(configUser?:User, dbUser?:User): Promise<EntityChange<User>> {
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
