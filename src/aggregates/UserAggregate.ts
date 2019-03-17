import { ChangeConstructor } from 'interfaces';
import { UserChangeMap } from 'services';
import { Connection } from 'typeorm';
import { User } from '../models/entities';
import { UserChanges } from '../models/entities/changes';
import { Aggregate } from './Aggregate';

export class UserAggregate extends Aggregate<User> {
  constructor(
    id: string,
    dbConnection: Connection
  ) {
    super(id, dbConnection.getRepository(UserChanges));
  }

  public replay(changes:UserChanges[]): User {
    let user:User = new User('N/A');

    changes.forEach((change) => {
      if(!UserChangeMap.has(change.id)) {
        throw new Error(`Encountered unresolved User change ${change.id}`);
      }

      const UserChangeCTR:ChangeConstructor<User> = UserChangeMap.get(change.id) as ChangeConstructor<User>;
      const userChange = new UserChangeCTR();
      user = userChange.update(user, change.payload);
      this.changes.push(change);
    });

    this.model = user;
    return user;
  }
}
