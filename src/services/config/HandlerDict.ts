import { Dictionary } from '../../models/Dictionary';
import { UserHandler } from './user/handler';

export const HandlerDict = Dictionary.from([
  UserHandler
], (configHandler) => [configHandler.key, configHandler.type]);
