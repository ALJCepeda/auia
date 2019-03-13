import { ConfigModel } from 'interfaces';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Spec, Test } from '../Test';
import { RepositoryInstance } from './RepositoryInstance';

@Entity('repositories')
export class Repository implements ConfigModel {
  @PrimaryColumn()
  public id: string;

  @Column()
  public branch:string = 'master';

  @OneToMany(() => RepositoryInstance, (repositoryInstance) => repositoryInstance.id)
  public repositoryInstances?:RepositoryInstance[];

  constructor(id:string, public data:any) {
    this.id = id;
  }

  public class(): string {
    return 'Repository';
  }

  public getSpecs():Array<Spec<ConfigModel>> {
    return [
      new Test(() => this.id.length >= 1, 'Repository needs a name in order to be registered')
    ];
  }
}

export class GitRepository extends Repository {}
