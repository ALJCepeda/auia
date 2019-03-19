import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../abstract';
import { Spec, Test } from '../Test';
import { UserRepository } from './UserRepository';

@Entity('repositories')
export class Repository extends BaseEntity {
  @Column()
  public branch:string = 'master';

  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositoryInstances?:UserRepository[];

  public class(): string {
    return 'Repository';
  }

  public getSpecs():Array<Spec<BaseEntity>> {
    return [
      new Test(() => this.name.length >= 1, 'Repository needs a name in order to be registered')
    ];
  }
}
