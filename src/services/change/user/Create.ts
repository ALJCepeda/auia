import { Change } from 'interfaces';
import { User } from 'models';
import { assign } from '../../assign';

export class Create extends Change<User> {
  public static from(obj:Partial<Create>): Create {
    return assign(new Create(), obj);
  }

  public async check(configUser?:User, dbUser?:User): Promise<Change<User>> {
    if(configUser && !dbUser) {
      this.payload = configUser.id;
      this.pending = true;
    }

    return this;
  }

  public update(user:User | undefined, payload:string): User {
    return User.from({ id:payload, created:true, deleted:false });
  }
}
