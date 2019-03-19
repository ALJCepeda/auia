import { Entity } from 'typeorm';

import { EntityChange } from '../../abstract';
import { Group } from '../Group';

@Entity('group-changes')
export class GroupChange extends EntityChange<Group> { }
