import { Entity } from 'typeorm';

import { EntityChange } from '../../../abstract';
import { GroupUser } from '../GroupUser';

@Entity('group-user-changes')
export class GroupUserChange extends EntityChange<GroupUser> { }
