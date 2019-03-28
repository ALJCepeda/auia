import { Entity, ManyToOne } from 'typeorm';
import { Spec } from '../models/Test'
import { Resource } from './Resource';
import { Group } from './Group';
import { User } from './User';

@Entity('group-users')
export class GroupUser extends Resource {
  public get name(): string {
    return `${this.group.id}::${this.user.id}`;
  }

  @ManyToOne(() => User, (user) => user.id)
  public user:User = new User();

  @ManyToOne(() => Group, (group) => group.id)
  public group:Group = new Group();

  public getSpecs():Array<Spec<Resource>> {
    return [];
  }
}
