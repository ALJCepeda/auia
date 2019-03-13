import { ConfigModel } from 'interfaces';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Spec } from '../Test';
import { GroupMembership } from './GroupMembership';

@Entity('group')
export class Group implements ConfigModel {
  @PrimaryColumn()
  public id:string;

  @OneToMany(() => GroupMembership, (groupMembership) => groupMembership.id)
  public groupMemberships?:GroupMembership[];

  @Column()
  public isSudo:boolean = false;

  constructor(
    id:string,
    public data:any
  ) {
    this.id = id;
  }

  public class(): string {
    return 'Group';
  }

  public getSpecs():Array<Spec<ConfigModel>> {
    return [];
  }
}
