import { Column, Entity, OneToMany } from 'typeorm';

import { EntityModel } from '../../abstract';
import { assign } from '../../services/assign';
import { Spec, Test } from '../Test';
import { UserRepository } from './UserRepository';

@Entity('repositories')
export class Repository extends EntityModel {
  public static from(model:Partial<Repository>): Repository {
    if(!model.id) {
      throw new Error(`Cannot construct Repository, object is missing id`);
    }

    return assign(new Repository(model.id), model);
  }

  @Column()
  public branch:string = 'master';

  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositoryInstances?:UserRepository[];

  public class(): string {
    return 'Repository';
  }

  public getSpecs():Array<Spec<EntityModel>> {
    return [
      new Test(() => this.id.length >= 1, 'Repository needs a name in order to be registered')
    ];
  }
}
