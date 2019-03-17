import { Entity } from 'typeorm';

import { ModelChanges } from '../../abstract';
import { Group } from '../Group';

@Entity('group-changes')
export class GroupChanges extends ModelChanges<Group> { }
