import { Entity } from 'typeorm';

import { ModelChanges } from '../../../abstract';
import { User } from '../User';

@Entity('user-changes')
export class UserChanges extends ModelChanges<User> { }
