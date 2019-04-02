import { User } from '../../../entities/User';
import { ConfigHandler } from '../../../interfaces/ConfigHandler';
import { build } from './build';
import { create } from './create';
import { task } from './task';

export const UserHandler:ConfigHandler = { key:'users', type:User.type, create, build, task };
