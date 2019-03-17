import { ConfigModel } from 'interfaces';
import { Column, Entity, OneToMany } from 'typeorm';
import { Spec } from '../Test';
import { GroupUser } from './GroupUser';
import { UserRepository } from './UserRepository';

@Entity('users')
export class User extends ConfigModel {
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
