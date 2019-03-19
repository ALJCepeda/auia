import { Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from 'abstract';
import { Spec } from 'models';
import { Group } from './Group';
import { User } from './User';

@Entity('group-users')
export class GroupUser extends BaseEntity {
  public get name(): string {
    return `${this.group.id}::${this.user.id}`;
  }

  @ManyToOne(() => User, (user) => user.id)
  public user:User;

  @ManyToOne(() => Group, (group) => group.id)
  public group:Group;

  constructor(
    user:User,
    group:Group,
    public data?:any
  ) {
    super(undefined, data);
    this.user = user;
    this.group = group;
  }

  public class():string {
    return 'GroupUser';
  }

  public getSpecs():Array<Spec<BaseEntity>> {
    return [];
  }
}
