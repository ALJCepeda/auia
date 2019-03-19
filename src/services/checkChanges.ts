import { Connection, Repository } from 'typeorm';

import { Change } from 'interfaces';
import { Configuration } from 'models';
import { BaseEntity } from 'abstract';
import { User } from 'entities';
import { UserChangeList } from './change/user';
import { ChangeDiffer } from './ChangeDiffer';

export interface ConfigChanges {
  users: Array<ChangesFor<User>>
}

export interface ChangesFor<ModelT extends BaseEntity> {
  model:ModelT,
  changes: Change<ModelT>[]
}

export async function checkChanges(config: Configuration, dbConnection: Connection): Promise<ConfigChanges> {
  console.debug('Checking for changes to config');
  const userChanges = await checkUsers(config, dbConnection);

  console.debug('Finished checking for changes to config');
  return {
    users: userChanges
  };
}

async function checkUser(configUser:User, repository:Repository<User>): Promise<ChangesFor<User>> {
  console.debug(`Diffing user ${configUser.name}`);
  const dbUser:User | undefined = await repository.findOne(configUser.id);
  const differ = new ChangeDiffer<User>(UserChangeList);
  const changes = await differ.diff(configUser, dbUser);

  const pendingChanges = changes.filter((change) => change.pending);
  console.debug(`Found ${ pendingChanges.length } change(s) for ${configUser.name}`);

  return {
    model: configUser,
    changes: pendingChanges
  };
}

async function checkUsers(config:Configuration, dbConnection:Connection): Promise<Array<ChangesFor<User>>> {
  console.debug('Diffing changes to users');
  const repository = dbConnection.getRepository(User);

  const diffChecks:Array<Promise<ChangesFor<User>>> = Array.from(config.users.values()).map((configUser) => checkUser(configUser, repository));

  const checks = Promise.all(diffChecks);
  console.log(`Finished diffing users`);
  return checks;
}
