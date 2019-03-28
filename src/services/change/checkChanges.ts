import { ResourceChange } from '../../entities/changes/ResourceChange';
import { UserChange } from '../../entities/changes/UserChange';
import { Resource } from '../../entities/Resource';
import { User } from '../../entities/User';
import { Registry } from '../../models/Registry';
import { EntityDiffer } from '../EntityDiffer';
import { flatten } from '../utils/flatten';
import { UserChanges } from './user/UserChangeDict';

export async function checkChanges(configRegistry: Registry, dbRegistry: Registry): Promise<ResourceChange<Resource>[]> {
  console.debug('Checking for changes to registry');
  const userChanges = await checkUsers(configRegistry, dbRegistry);

  console.debug('Finished checking for changes to registry');
  return userChanges;
}

async function checkUser(configUser:User, dbUser?:User): Promise<UserChange[]> {
  console.debug(`Diffing user ${configUser.name}`);
  const differ = new EntityDiffer<User>(UserChanges);
  const changes = await differ.diff(configUser, dbUser);

  const pendingChanges = changes.filter((change) => change.pending);
  console.debug(`Found ${ pendingChanges.length } change(s) for ${configUser.name}`);

  return pendingChanges;
}

async function checkUsers(configRegistry:Registry, dbRegistry:Registry): Promise<UserChange[]> {
  console.debug('Diffing changes to users');

  const diffChecks:Array<Promise<UserChange[]>> = Array.from(configRegistry.users.values()).map(async (configUser) => {
    const dbUser:User | undefined = await dbRegistry.users.get(configUser.name);
    return checkUser(configUser, dbUser)
  });
  const checks = await Promise.all(diffChecks);
  console.log(`Finished diffing users`);
  return flatten(checks);
}
