import { Configuration, User } from 'models';
import { Connection } from 'typeorm';
import { ConfigModel, ModelChanges } from '../interfaces';
import { UserDiffer } from './changes/user';

export async function checkChanges(config: Configuration, dbConnection: Connection): Promise<Array<ModelChanges<ConfigModel>>> {
  const userDiffs = await checkUsers(config, dbConnection);

  return [
    ...userDiffs
  ];
}

async function checkUsers(config:Configuration, dbConnection:Connection): Promise<Array<ModelChanges<User>>> {
  const repository = dbConnection.getRepository(User);

  const diffChecks:Array<Promise<ModelChanges<User>>> = Array.from(config.users.values()).map(async (configUser:User) => {
    const dbUser:User | undefined = await repository.findOne(configUser.id);
    const differ = new UserDiffer(configUser, dbUser);
    return differ.diff();
  });

  return Promise.all(diffChecks);
}
