import { task } from './task';
import { User } from './User';
import { ResourceHandler } from '../../interfaces/ResourceHandler';
import { build } from './build';
import { create } from './create';

export const UserHandler:ResourceHandler = {
  key:'users',
  class:User,
  type:User.type,
  create,
  build,
  task
};
