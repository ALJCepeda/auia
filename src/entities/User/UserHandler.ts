import { task } from './task';
import { User } from './User';
import { ResourceHandler } from '../../interfaces/ResourceHandler';
import { associate } from './associate';
import { create } from './create';

export const UserHandler = new ResourceHandler(User,{ create, associate, task });
