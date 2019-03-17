import { Connection } from 'typeorm';

import { Changes } from 'interfaces';
import { Configuration, EntityModel, User } from 'models';
import { UserDiffer } from './differs';

export async function checkChanges(config: Configuration, dbConnection: Connection): Promise<Array<Changes<EntityModel>>> {
  const userChanges = await checkUsers(config, dbConnection);

  return [
    ...userChanges
  ];
}

async function checkUsers(config:Configuration, dbConnection:Connection): Promise<Array<Changes<User>>> {
  const repository = dbConnection.getRepository(User);

  const diffChecks:Array<Promise<Changes<User>>> = Array.from(config.users.values()).map(async (configUser:User) => {
    const dbUser:User | undefined = await repository.findOne(configUser.id);
    const differ = new UserDiffer(configUser, dbUser);
    return differ.diff();
  });

  return Promise.all(diffChecks);
}
