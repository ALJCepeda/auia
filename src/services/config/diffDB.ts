import { ConfigModel } from 'interfaces';
import { Configuration, User } from 'models';
import { Connection } from 'typeorm';

interface Action {
  id: string;
  payload: ConfigModel;
}

interface PendingActions<T extends ConfigModel> {
  model: T;
  actions: Action[];
}

export async function generateActions(config:Configuration, dbConnection:Connection): Promise<Array<PendingActions<User>>> {
  const userRepository = dbConnection.getRepository(User);
  const allDBUsers = await userRepository.find();

  const allDBUsersMap = allDBUsers.reduce((map, user) => {
    map.set(user.id, user);
    return map;
  }, new Map());

  const dbChecks:Array<Promise<PendingActions<User>>> = Array.from(config.users.values()).map(async (configUser) => {
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

function checkDelete(user:User, allConfigUsersMap:Map<string, User>, actions:Action[]): Action[] {
  const newActions = [ ...actions ];

  if(!allConfigUsersMap.has(user.id)) {
    newActions.push({
      id: 'Delete User',
      payload: user
    });
  }

  return newActions;
}

function checkCreate(user:User, allDbUsersMap:Map<string, User>, actions:Action[]): Action[] {
  const newActions = [ ...actions ];

  if (!allDbUsersMap.has(user.id)) {
    newActions.push({
      id: 'Create User',
      payload: user
    });
  }

  return newActions;
}
