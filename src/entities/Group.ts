import { Column, Entity, OneToMany } from 'typeorm';
import { Spec } from '../models/Test';
import { Resource } from './Resource';
import { GroupUser } from './GroupUser';

@Entity('group')
export class Group extends Resource {
  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public groupMemberships?:GroupUser[];

  @Column()
  public isSudo:boolean = false;

  public getSpecs():Array<Spec<Resource>> {
    return [];
  }
}
