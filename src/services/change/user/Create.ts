import { User } from 'entities';
import { DBEntityChange, EntityChange } from '../EntityChange';

export class Create extends EntityChange<User> {
  public async check(configUser?:User, dbUser?:User): Promise<EntityChange<User>> {
    if(configUser && !dbUser) {
      this.target = configUser.name;
      this.payload = configUser.name;
      this.pending = true;
    }

    return this;
  }

  public update(user:User | undefined, change:DBEntityChange): User {
    const newUser = new User();
    newUser.name = change.payload;
    newUser.created = true;
    newUser.deleted = false;
    newUser.createdAt = change.createdAt;
    newUser.lastModifiedAt = change.createdAt;

    return newUser;
  }
}
