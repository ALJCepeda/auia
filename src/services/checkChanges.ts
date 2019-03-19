import { Connection, Repository } from 'typeorm';

import { Changes } from 'interfaces';
import { Configuration } from 'models';
import { BaseEntity } from 'abstract';
import { User } from 'entities';
import { UserDiffer } from './differs';

export async function checkChanges(config: Configuration, dbConnection: Connection): Promise<Array<Changes<BaseEntity>>> {
  console.debug('Checking for changes to config');
  const userChanges = await checkUsers(config, dbConnection);

  console.debug('Finished checking for changes to config');
  return [
    ...userChanges
  ];
}

async function checkUser(configUser:User, repository:Repository<User>): Promise<Changes<User>> {
  console.debug(`Diffing user ${configUser.name}`);
  const dbUser:User | undefined = await repository.findOne(configUser.id);
  const differ = new UserDiffer(configUser, dbUser);
  const changes = await differ.diff();
  const pendingChanges = changes.getPendingChanges();
  console.debug(`Found ${ pendingChanges.length } change(s) for ${configUser.name}`);
  return pendingChanges;
}

async function checkUsers(config:Configuration, dbConnection:Connection): Promise<Array<Changes<User>>> {
  console.debug('Diffing changes to users');
  const repository = dbConnection.getRepository(User);

  const diffChecks:Array<Promise<Changes<User>>> = Array.from(config.users.values()).map((configUser) => checkUser(configUser, repository));

  const checks = Promise.all(diffChecks);
  console.log(`Finished diffing users`);
  return checks;
}
