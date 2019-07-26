import { Entity, ManyToOne } from 'typeorm';
import { Spec } from '../../models/Test';
import { Group } from '../group/Group';
import { Resource } from '../Resource';
import { User } from '../User/User';

@Entity('group-users')
export class GroupUser extends Resource {
  public get name(): string {
    return `${this.group.id}::${this.user.id}`;
  }

  public static associate(user:User, group:Group): GroupUser {
    const groupUser = new GroupUser();
    groupUser.user = user;
    groupUser.group = group;

    (user.groups as GroupUser[]).push(groupUser);
    user.groupMap.set(group.name, groupUser);
    return groupUser;
  }

  @ManyToOne(() => User, (user) => user.id)
  public user:User = new User();

  @ManyToOne(() => Group, (group) => group.id)
  public group:Group = new Group();

  public getSpecs():Array<Spec<Resource>> {
    return [];
  }
}
