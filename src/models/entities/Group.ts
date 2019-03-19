import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../abstract';
import { Spec } from '../Test';
import { GroupUser } from './GroupUser';

@Entity('group')
export class Group extends BaseEntity {
  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public groupMemberships?:GroupUser[];

  @Column()
  public isSudo:boolean = false;

  public class(): string {
    return 'Group';
  }

  public getSpecs():Array<Spec<BaseEntity>> {
    return [];
  }
}
