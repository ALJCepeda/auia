import { User } from '../User';
import { UserChange } from './UserChange';

export class Active extends UserChange {
  public check(configUser:User, dbUser:User): UserChange {
    if(configUser.active !== dbUser.active) {
      this.target = configUser.name;
      this.payload = String(configUser.active);
    }

    return this;
  }

  public update(user:User): User {
    return Object.assign(super.update(user), {
      active: this.payload === 'true'
    });
  }
}
