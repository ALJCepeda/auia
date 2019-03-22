import { Entity } from 'typeorm';

import { EntityChange } from 'services';
import { UserRepository } from '../UserRepository';

@Entity('user-repository-changes')
export abstract class UserRepositoryChange extends EntityChange<UserRepository> { }
