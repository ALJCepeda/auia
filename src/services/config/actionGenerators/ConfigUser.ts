
import { Action, ActionGenerator, PendingActions } from 'interfaces';
import { Configuration, User } from 'models';
import { Connection } from 'typeorm';

export class UserActionGenerator implements ActionGenerator {
  public dbUsers:User[] = [];
  public dbUsersMap:Map<string, User> = new Map();

  public configUsers:User[] = [];
  public configUsersMap:Map<string, User> = new Map();

  constructor(
    public config:Configuration,
    public dbConnection:Connection
  ) { }

  async preload(): Promise<void> {
    const userRepository = this.dbConnection.getRepository(User);
    this.dbUsers = await userRepository.find();
    this.dbUsersMap = this.dbUsers.reduce((map, user) => {
      map.set(user.id, user);
      return map;
    }, new Map());

    this.configUsersMap = this.config.users;
    this.configUsers = Array.from(this.configUsersMap.values());
    return;
  }

  async generate(): Promise<Array<PendingActions<User>>> {
    const dbChecks:Array<Promise<PendingActions<User>>> = this.configUsers.map(async (configUser) => {
      let actions:Action[] = [];

      actions.push(new ConfigUserActions.CreateUser(configUser, this.dbUsersMap));

      actions = actions.filter((action) => action.pending);
      return { model:configUser, actions };
    });

    return Promise.all(dbChecks);;
  }
}

class CreateUser implements Action {
  public payload: User;
  public pending: boolean = false;

  constructor(public configUser:User, public allDBUserMap:Map<string, User>) {
    this.payload = configUser;
  }

  async check(): Promise<boolean> {
    this.pending = !this.allDBUserMap.has(this.configUser.id)
    return this.pending;
  }
}

export const ConfigUserActions = {
  CreateUser
};
