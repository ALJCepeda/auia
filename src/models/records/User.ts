import { Column, Entity, OneToMany } from 'typeorm';

import { assign } from '../../services/assign';
import { Spec } from '../Test';
import { ConfigModel } from './ConfigModel';
import { GroupUser } from './GroupUser';
import { UserRepository } from './UserRepository';

@Entity('users')
export class User extends ConfigModel {
  public static from(model:Partial<User>): User {
    if(!model.id) {
      throw new Error(`Cannot construct User, object is missing id`);
    }

    return assign(new User(model.id), model);
  }

  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositoryInstances?:UserRepository[];
  public repositoryInstanceMap:Map<string, UserRepository> = new Map();

  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public groupMemberships?:GroupUser[];
  public groupMembershipMap:Map<string, GroupUser> = new Map();

  @Column()
  public isActive:boolean = false;

  public class(): string {
    return 'User';
  }

  public getSpecs(): Array<Spec<ConfigModel>> {
    return [];
  }
}
