import { Entity } from 'typeorm';

import { ModelChanges } from '../../../abstract';
import { GroupUser } from '../GroupUser';

@Entity('group-user-changes')
export class GroupUserChanges extends ModelChanges<GroupUser> { }
