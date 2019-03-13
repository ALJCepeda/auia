import { ConfigModel } from 'interfaces';
import { Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Spec } from '../Test';
import { Group } from './Group';
import { User } from './User';

@Entity('group-memberships')
export class GroupMembership implements ConfigModel {
  @PrimaryColumn()
  public get id():string {
    return `${this.group.id}::${this.user.id}`;
  }

  @ManyToOne(() => User, (user) => user.id)
  public user:User;

  @ManyToOne(() => Group, (group) => group.id)
  public group:Group;

  constructor(
    user:User,
    group:Group,
    public data:any
  ) {
    this.user = user;
    this.group = group;
  }

  public class() {
    return GroupMembership;
  }

  public getSpecs():Array<Spec<ConfigModel>> {
    return [];
  }
}
