import { User } from 'models';
import { ConfigHandler } from './ConfigHandler';
import { UserConfig } from './User';

export * from './ConfigHandler';
export * from './User';

const handlers:Map<string | Function, ConfigHandler> = new Map<string | Function, ConfigHandler>([
  [ 'users', UserConfig ],
  [ User, UserConfig ]
]);

export function getConfigHandler(key:string | Function): ConfigHandler {
  if(!handlers.has(key)) {
    throw new Error(`No handler found for key: ${key}`);
  } else {
    return handlers.get(key) as ConfigHandler;
  }
}
