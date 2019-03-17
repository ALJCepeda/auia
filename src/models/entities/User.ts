import { Column, Entity, OneToMany } from 'typeorm';

import { assign } from '../../services/assign';
import { EntityModel } from '../abstract';
import { Spec } from '../Test';
import { GroupUser } from './GroupUser';
import { UserRepository } from './UserRepository';

@Entity('users')
export class User extends EntityModel {
  public static from(model:Partial<User>): User {
    if(!model.id) {
      throw new Error(`Cannot construct User, object is missing id`);
    }

    return assign(new User(model.id), model);
  }

  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositories?:UserRepository[];
  public repositoryMap:Map<string, UserRepository> = new Map();

  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public groups?:GroupUser[];
  public groupMap:Map<string, GroupUser> = new Map();

  @Column()
  public isActive:boolean = false;

  public class(): string {
    return 'User';
  }

  public getSpecs(): Array<Spec<EntityModel>> {
    return [];
  }
}
