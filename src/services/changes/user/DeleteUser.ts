import { ModelChange } from '../../../interfaces';
import { User } from '../../../models/records';

export class DeleteUser extends ModelChange<string, User> {
  public async check(configUser?:User, dbUser?:User): Promise<ModelChange<string, User>> {
    if(dbUser && !configUser) {
      this.payload = dbUser.id;
      this.pending = true;
    }

    return this;
  }
}
