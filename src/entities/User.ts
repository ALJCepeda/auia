import { Column, Entity, OneToMany } from 'typeorm';
import { Spec } from '../models/Test';

import { Resource } from './Resource';
import { GroupUser } from './GroupUser';
import { UserRepository } from './UserRepository';

@Entity('users')
export class User extends Resource {
  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositories?:UserRepository[];
  public repositoryMap:Map<string, UserRepository> = new Map();

  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public groups?:GroupUser[];
  public groupMap:Map<string, GroupUser> = new Map();

  @Column()
  public isActive:boolean = false;

  public getSpecs(): Array<Spec<Resource>> {
    return [];
  }
}
