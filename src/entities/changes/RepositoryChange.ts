import { Entity } from 'typeorm';

import { EntityChange } from 'services';
import { Repository } from '../Repository';

@Entity('repository-changes')
export abstract class RepositoryChange extends EntityChange<Repository> { }
