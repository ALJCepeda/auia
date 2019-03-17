import { Change } from 'interfaces';
import { User } from 'models';

export class Delete extends Change<User> {
  public async check(configUser?:User, dbUser?:User): Promise<Change<User>> {
    if(dbUser && !configUser) {
      this.payload = dbUser.id;
      this.pending = true;
    }

    return this;
  }

  public update(user:User, payload:string): User {
    return User.from({ ...user, created:false, deleted:true });
  }
}
