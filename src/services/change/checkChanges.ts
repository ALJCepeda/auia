import { Connection, Repository } from 'typeorm';

import { Configuration } from 'models';
import { User, UserChange } from 'entities';
import { UserChangeList } from './user';
import { EntityDiffer } from '../EntityDiffer';

export interface AppChanges {
  users: UserChange[]
}

export async function checkChanges(config: Configuration, dbConnection: Connection): Promise<AppChanges> {
  console.debug('Checking for changes to config');
  const userChanges = await checkUsers(config, dbConnection);

  console.debug('Finished checking for changes to config');
  return {
    users: userChanges
  };
}

async function checkUser(configUser:User, repository:Repository<User>): Promise<UserChange[]> {
  console.debug(`Diffing user ${configUser.name}`);
  const dbUser:User | undefined = await repository.findOne(configUser.id);
  const differ = new EntityDiffer<User>(UserChangeList);
  const changes = await differ.diff(configUser, dbUser);

  const pendingChanges = changes.filter((change) => change.pending);
  console.debug(`Found ${ pendingChanges.length } change(s) for ${configUser.name}`);

  return pendingChanges;
}

async function checkUsers(config:Configuration, dbConnection:Connection): Promise<UserChange[]> {
  console.debug('Diffing changes to users');
  const repository = dbConnection.getRepository(User);

  const diffChecks:Array<Promise<UserChange[]>> = Array.from(config.users.values()).map((configUser) => checkUser(configUser, repository));
  const checks = await Promise.all(diffChecks);
  const flattenedChecks = checks.reduce((result, check) => [ ...result, ...check ], []);
  console.log(`Finished diffing users`);
  return flattenedChecks;
}
