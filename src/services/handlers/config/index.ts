import { ConfigModel, isConfigModel } from 'interfaces';
import { User } from 'models';
import { ConfigHandler } from './ConfigHandler';
import { UserConfig } from './User';

export * from './ConfigHandler';
export * from './User';

const handlers:Map<string | Function, ConfigHandler> = new Map<string | Function, ConfigHandler>([
  [ 'users', UserConfig ],
  [ 'User', UserConfig ]
]);

export function getConfigHandler(key:string | ConfigModel): ConfigHandler {
  let _key:string | Function;
  if(isConfigModel(key)) {
    _key = key.class();
  } else if(typeof key === 'string') {
    _key = key;
  } else {
    throw new Error(`Unable to handle type: ${key}`);
  }

  debugger;
  if(!handlers.has(_key)) {
    throw new Error(`No handler found for key: ${key}`);
  } else {
    return handlers.get(_key) as ConfigHandler;
  }
}
