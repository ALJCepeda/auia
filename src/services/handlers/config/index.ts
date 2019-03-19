import { ConfigHandler } from 'interfaces';
import { BaseEntity, isEntityModel } from 'abstract';
import { UserConfig } from './User';

export * from '../../../interfaces/ConfigHandler';
export * from './User';

const handlers:Map<string | Function, ConfigHandler> = new Map<string | Function, ConfigHandler>([
  [ 'users', UserConfig ],
  [ 'User', UserConfig ]
]);

export function getConfigHandler(key:string | BaseEntity): ConfigHandler {
  let _key:string | Function;
  if(isEntityModel(key)) {
    _key = key.class();
  } else if(typeof key === 'string') {
    _key = key;
  } else {
    throw new Error(`Unable to handle type: ${JSON.stringify(key)}`);
  }

  if(!handlers.has(_key)) {
    throw new Error(`No handler found for key: ${key}`);
  } else {
    return handlers.get(_key) as ConfigHandler;
  }
}
