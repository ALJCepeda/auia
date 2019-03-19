import { Entity } from 'typeorm';

import { EntityChange } from '../../abstract';
import { UserRepository } from '../UserRepository';

@Entity('user-repository-changes')
export class UserRepositoryChange extends EntityChange<UserRepository> { }
