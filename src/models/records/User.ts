import { ConfigModel } from 'interfaces';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { GroupMembership } from './GroupMembership';
import { RepositoryInstance } from './RepositoryInstance';

export interface UserData {
  name:string;
  repositories:string[];
  groups:string[];
}

@Entity('users')
export class User implements ConfigModel {
  @PrimaryColumn()
  public id: string;

  @OneToMany(() => RepositoryInstance, (repositoryInstance) => repositoryInstance.id)
  public repositoryInstances?:RepositoryInstance[];
  public repositoryInstanceMap:Map<string, RepositoryInstance> = new Map();

  @OneToMany(() => GroupMembership, (groupMembership) => groupMembership.id)
  public groupMemberships?:GroupMembership[];
  public groupMembershipMap:Map<string, GroupMembership> = new Map();

  @Column()
  public isActive:boolean = false;

  constructor(
    id: string,
    public data:UserData
  ) {
    this.id = id;
  }

  public class() {
    return User;
  }

  public getSpecs() {
    return [];
  }
}
