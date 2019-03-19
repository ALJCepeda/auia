import { Change } from 'interfaces';
import { User } from 'entities';
import { DBEntityChange } from 'abstract';

export class Create extends Change<User> {
  public async check(configUser?:User, dbUser?:User): Promise<Change<User>> {
    if(configUser && !dbUser) {
      this.payload = configUser.name;
      this.pending = true;
    }

    return this;
  }

  public update(user:User | undefined, change:DBEntityChange): User {
    const newUser = new User(change.payload);
    newUser.created = true;
    newUser.deleted = false;
    newUser.createdAt = change.createdAt;
    newUser.lastModifiedAt = change.createdAt;

    return newUser;
  }
}
