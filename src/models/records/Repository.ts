import { ConfigModel } from 'interfaces';
import { Column, Entity, OneToMany } from 'typeorm';
import { Spec, Test } from '../Test';
import { UserRepository } from './UserRepository';

@Entity('repositories')
export class Repository extends ConfigModel {
  @Column()
  public branch:string = 'master';

  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositoryInstances?:UserRepository[];

  public class(): string {
    return 'Repository';
  }

  public getSpecs():Array<Spec<ConfigModel>> {
    return [
      new Test(() => this.id.length >= 1, 'Repository needs a name in order to be registered')
    ];
  }
}
