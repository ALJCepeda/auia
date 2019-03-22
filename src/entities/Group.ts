import { Column, Entity, OneToMany } from 'typeorm';

import { Spec } from 'models';
import { BaseEntity } from './BaseEntity';
import { GroupUser } from './GroupUser';

@Entity('group')
export class Group extends BaseEntity {
  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public groupMemberships?:GroupUser[];

  @Column()
  public isSudo:boolean = false;

  public getSpecs():Array<Spec<BaseEntity>> {
    return [];
  }
}
