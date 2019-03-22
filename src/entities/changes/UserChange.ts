import { Entity } from 'typeorm';

import { EntityChange } from 'services';
import { User } from '../User';

@Entity('user-changes')
export abstract class UserChange extends EntityChange<User> { }
