import { Entity } from 'typeorm';

import { ModelChanges } from '../../../abstract';
import { UserRepository } from '../UserRepository';

@Entity('user-repository-changes')
export class UserRepositoryChanges extends ModelChanges<UserRepository> { }
