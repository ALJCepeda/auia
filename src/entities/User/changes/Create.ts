import { UserChange } from './UserChange';
import { User } from '../User';

export class Create extends UserChange {
  public check(configUser:User, dbUser:User): UserChange {
    return this;
  }

  public update(user:User): User {
    return Object.assign(super.update(user), {
      name:this.payload,
      createdAt:this.createdAt,
      active:true
    });
  }
}
