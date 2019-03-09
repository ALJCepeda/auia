import { ConfigModel } from 'interfaces';
import {Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryColumn} from 'typeorm';
import { Group } from './Group';
import { RepositoryInstance } from './RepositoryInstance';

export interface UserData {
  name:string;
  repositories:string[];
  groups:string[];
}

@Entity('users')
export class User implements ConfigModel {
  @OneToMany(() => RepositoryInstance)
  public repositoryInstances:RepositoryInstance[] = [];
  public repositoryInstanceMap:Map<string, RepositoryInstance> = new Map();

  @OneToMany(() => GroupMembership)
  public groupMemberships:GroupMembership[] = [];
  public groupMembershipMap:Map<string, GroupMembership> = new Map();

  @PrimaryColumn()
  public id:string;

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
