import { Column, Entity, OneToMany } from 'typeorm';

import { assign } from '../../services/assign';
import { EntityModel } from '../abstract';
import { Spec } from '../Test';
import { GroupUser } from './GroupUser';

@Entity('group')
export class Group extends EntityModel {
  public static from(model:Partial<Group>): Group {
    if(!model.id) {
      throw new Error(`Cannot construct Group, model is missing id`);
    }

    return assign(new Group(model.id), model);
  }

  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public groupMemberships?:GroupUser[];

  @Column()
  public isSudo:boolean = false;

  public class(): string {
    return 'Group';
  }

  public getSpecs():Array<Spec<EntityModel>> {
    return [];
  }
}
