import { ConfigHandler } from '../../interfaces/ConfigHandler';
import { Dictionary } from '../../models/Dictionary';
import { UserHandler } from './user/handler';

export const HandlerDict:Dictionary<string, ConfigHandler> = Dictionary.from([
  UserHandler
], (configHandler) => [configHandler.key, configHandler.type]);
