import { UserHandler } from '../../entities/User/UserHandler';
import { ResourceHandler } from '../../interfaces/ResourceHandler';
import { Dictionary } from '../../models/Dictionary';

export const HandlerDict:Dictionary<string, ResourceHandler> = Dictionary.from([
  UserHandler
], (configHandler) => [configHandler.schemaKey, configHandler.type]);
