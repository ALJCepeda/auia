import { Entity } from 'typeorm';
import { User } from '..';
import { ModelChanges } from './ModelChanges';

@Entity('user-change')
export class UserChanges extends ModelChanges<User> { }
