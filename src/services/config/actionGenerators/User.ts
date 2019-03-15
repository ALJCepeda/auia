import { Action, PendingActions } from 'interfaces';
import { Configuration, User } from 'models';
import { Connection } from 'typeorm';

export class UserActionGenerator {
  constructor(
    public config:Configuration,
    public dbConnection:Connection
  ){ }

  async generate() {
    const userRepository = this.dbConnection.getRepository(User);
    const allDBUsers = await userRepository.find();
    const allConfigUserMap = this.config.users;
    const allDBUsersMap = allDBUsers.reduce((map, user) => {
      map.set(user.id, user);
      return map;
    }, new Map());

    const dbChecks:Array<Promise<PendingActions<User>>> = Array.from(allConfigUserMap.values()).map(async (configUser) => {
      let actions:Action[] = [];

      actions = checkCreate(configUser, allDBUsersMap, actions);

      return { model:configUser, actions };
    });
    const dbActions = await Promise.all(dbChecks);

    const configActions:Array<PendingActions<User>> = Array.from(allDBUsersMap.values()).map((dbUser) => {
      let actions:Action[] = [];

      actions = checkDelete(dbUser, config.users, actions);

      return { model:dbUser, actions };
    });

    return dbActions.concat(configActions);
  }
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

class DeleteUser {
  public payload: User;
  public pending: boolean = false;

  constructor(public dbUser:User, public allConfigUserMap:Map<string, User>) {
    this.payload = dbUser;
  }

  async check(): Promise<boolean> {
    this.pending = !allConfigUsersMap.has(user.id);
    return this.pending;
  }
}

export const UserConfigActions = {
  CreateUser
};

export const UserDatabaseActions = {
  DeleteUser
};

export const UserConfigActionsList = Object.values(UserConfigActions);
