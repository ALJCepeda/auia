import { Entity } from 'typeorm';

import { ModelChanges } from '../../../abstract';
import { Repository } from '../Repository';

@Entity('repository-changes')
export class RepositoryChanges extends ModelChanges<Repository> { }
