import { Change } from 'interfaces';
import { User } from 'models';

export class Create extends Change<User> {
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
