import { Column, Entity, OneToMany } from 'typeorm';

import { Spec, Test } from 'models';
import { BaseEntity } from './BaseEntity';
import { UserRepository } from './UserRepository';

@Entity('repositories')
export class Repository extends BaseEntity {
  @Column()
  public branch:string = 'master';

  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositoryInstances?:UserRepository[];

  public getSpecs():Array<Spec<BaseEntity>> {
    return [
      new Test(() => this.name.length >= 1, 'Repository needs a name in order to be registered')
    ];
  }
}
