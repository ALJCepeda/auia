import { ResourceHandler } from '../../interfaces/ResourceHandler';
import { associate } from './associate';
import { create } from './create';
import { task } from './task';
import { User } from './User';

export const UserHandler = new ResourceHandler(User, { create, associate, task });
