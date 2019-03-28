import { Resource } from '../../../entities/Resource';
import { User } from '../../../entities/User';
import { ConfigHandler } from '../../../interfaces/ConfigHandler';
import { UserConfig } from './User';

//TODO: Change to dictionary
const handlers:Map<string | Function, ConfigHandler> = new Map<string | Function, ConfigHandler>([
  [ 'users', UserConfig ],
  [ User.type, UserConfig ]
]);

export function getConfigHandler(key:string | Resource): ConfigHandler {
  let _key:string | Function;
  if(typeof key === 'string') {
    _key = key;
  } else  {
    _key = key.type;
  }
  
  if(!handlers.has(_key)) {
    throw new Error(`No handler found for key: ${key}`);
  } else {
    return handlers.get(_key) as ConfigHandler;
  }
}
