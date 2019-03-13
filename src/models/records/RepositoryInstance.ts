import * as path from 'path';

import { ConfigModel } from 'interfaces';
import { validateModel } from 'services';
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Spec, Test } from '../Test';
import { Repository } from './Repository';
import { User } from './User';

@Entity('repository-instances')
export class RepositoryInstance implements ConfigModel {
  @PrimaryColumn()
  public get id(): string {
    return path.normalize(`${this.basePath}/${this.repository.id}`);
  }

  @Column()
  public basePath:string = `~/repos`;

  @Column()
  public branch:string = `master`;

  @ManyToOne(() => User, (user) => user.id)
  public user:User;

  @ManyToOne(() => Repository, (repository) => repository.id)
  public repository:Repository;

  constructor(user:User, repository:Repository, public data:any) {
    this.user = user;
    this.repository = repository;
  }

  public class(): string {
    return 'RepositoryInstance';
  }

  public getSpecs(): Array<Spec<ConfigModel>> {
    return [
      new Test(() => validateModel(this.repository), 'Invalid repository provided to repository instance'),
      new Test(() => this.basePath.length > 0, 'Must provide a valid base path'),
      new Test(() => this.branch.length > 0, 'Must provide a valid branch')
    ];
  }
}