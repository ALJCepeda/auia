import { Entity } from 'typeorm';

import { EntityChange } from '../../abstract';
import { User } from '../User';

@Entity('user-changes')
export abstract class UserChange extends EntityChange<User> { }
