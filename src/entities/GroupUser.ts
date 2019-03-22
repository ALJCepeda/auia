import { Spec } from 'models';
import { Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './BaseEntity';
import { Group } from './Group';
import { User } from './User';

@Entity('group-users')
export class GroupUser extends BaseEntity {
  public get name(): string {
    return `${this.group.id}::${this.user.id}`;
  }

  @ManyToOne(() => User, (user) => user.id)
  public user:User = new User();

  @ManyToOne(() => Group, (group) => group.id)
  public group:Group = new Group();

  public getSpecs():Array<Spec<BaseEntity>> {
    return [];
  }
}
