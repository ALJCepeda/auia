import { ModelChange } from '../../../interfaces';
import { User } from '../../../models/records';

export class CreateUser extends ModelChange<string, User> {
  public async check(configUser?:User, dbUser?:User): Promise<ModelChange<string, User>> {
    if(configUser && !dbUser) {
      this.payload = configUser.id;
      this.pending = true;
    }

    return this;
  }
}
