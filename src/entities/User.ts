import { Column, Entity, OneToMany } from 'typeorm';

import { Spec } from 'models';
import { BaseEntity } from './BaseEntity';
import { GroupUser } from './GroupUser';
import { UserRepository } from './UserRepository';

@Entity('users')
export class User extends BaseEntity {
  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositories?:UserRepository[];
  public repositoryMap:Map<string, UserRepository> = new Map();

  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public groups?:GroupUser[];
  public groupMap:Map<string, GroupUser> = new Map();

  @Column()
  public isActive:boolean = false;

  public getSpecs(): Array<Spec<BaseEntity>> {
    return [];
  }
}
