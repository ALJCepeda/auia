import { Entity } from 'typeorm';

import { EntityChange } from 'services';
import { GroupUser } from '../GroupUser';

@Entity('group-user-changes')
export abstract class GroupUserChange extends EntityChange<GroupUser> { }
