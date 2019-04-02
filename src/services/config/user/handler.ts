import { User } from '../../../entities/User';
import { ConfigHandler } from '../../../interfaces/ConfigHandler';
import { build } from './build';
import { create } from './create';

export const UserHandler:ConfigHandler = { key:'users', type:User.type, create, build };
