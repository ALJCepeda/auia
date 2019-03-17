import { Entity, ManyToOne } from 'typeorm';

import { assign } from '../../services/assign';
import { Spec } from '../Test';
import { ConfigModel } from './ConfigModel';
import { Group } from './Group';
import { User } from './User';

@Entity('group-users')
export class GroupUser extends ConfigModel {
  public static from(model:Partial<GroupUser>): GroupUser {
    if(!model.group) {
      throw new Error(`Cannot construct GroupUser, object is missing Group`);
    }

    if(!model.user) {
      throw new Error(`Cannot construct GroupUser, object is missing User`);
    }

    return assign(new GroupUser(model.user, model.group), model);
  }

  public get id(): string {
    return `${this.group.id}::${this.user.id}`;
  }

  // @ts-ignore
  public set id() { }

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

  public getSpecs():Array<Spec<ConfigModel>> {
    return [];
  }
}
