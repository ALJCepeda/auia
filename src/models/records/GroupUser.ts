import { ConfigModel } from 'interfaces';
import { Entity, ManyToOne } from 'typeorm';
import { Spec } from '../Test';
import { Group } from './Group';
import { User } from './User';

@Entity('group-users')
export class GroupUser extends ConfigModel {
  public get id(): string {
    return `${this.group.id}::${this.user.id}`;
  }

  public set id(value:string) { }

  @ManyToOne(() => User, (user) => user.id)
  public user:User;

  @ManyToOne(() => Group, (group) => group.id)
  public group:Group;

  constructor(
    user:User,
    group:Group,
    public data:any
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
