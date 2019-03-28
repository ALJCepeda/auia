import { Column, Entity, OneToMany } from 'typeorm';
import { Spec, Test } from '../models/Test';
import { Resource } from './Resource';
import { UserRepository } from './UserRepository';

@Entity('repositories')
export class Repository extends Resource {
  @Column()
  public branch:string = 'master';

  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositoryInstances?:UserRepository[];

  public getSpecs():Array<Spec<Resource>> {
    return [
      new Test(() => this.name.length >= 1, 'Repository needs a name in order to be registered')
    ];
  }
}
