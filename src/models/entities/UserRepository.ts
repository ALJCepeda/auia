import * as path from 'path';
import { Column, Entity, ManyToOne } from 'typeorm';

import { validateModel } from 'services';
import { BaseEntity } from '../../abstract';
import { Spec, Test } from '../Test';
import { Repository } from './Repository';
import { User } from './User';

@Entity('user-repositories')
export class UserRepository extends BaseEntity {
  public get name(): string {
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

  constructor(user:User, repository:Repository, data?:any) {
    super(undefined, data);
    this.user = user;
    this.repository = repository;
  }

  public class(): string {
    return 'UserRepository';
  }

  public getSpecs(): Array<Spec<BaseEntity>> {
    return [
      new Test(() => validateModel(this.repository), 'Invalid repository provided to repository instance'),
      new Test(() => this.basePath.length > 0, 'Must provide a valid base path'),
      new Test(() => this.branch.length > 0, 'Must provide a valid branch')
    ];
  }
}
