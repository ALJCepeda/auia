import * as path from 'path';
import { Column, Entity, ManyToOne } from 'typeorm';

import { validateModel } from 'services';
import { EntityModel } from '../../abstract';
import { assign } from '../../services/assign';
import { Spec, Test } from '../Test';
import { Repository } from './Repository';
import { User } from './User';

@Entity('user-repositories')
export class UserRepository extends EntityModel {
  public static from(model:Partial<UserRepository>): UserRepository {
    if(!model.user) {
      throw new Error(`Cannot construct UserRepository, object is missing User`);
    }

    if(!model.repository) {
      throw new Error(`Cannot construct UserRepository, object is missing Repository`);
    }

    return assign(new UserRepository(model.user, model.repository), model);
  }

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

  constructor(user:User, repository:Repository, data?:any) {
    super(undefined, data);
    this.user = user;
    this.repository = repository;
  }

  public class(): string {
    return 'UserRepository';
  }

  public getSpecs(): Array<Spec<EntityModel>> {
    return [
      new Test(() => validateModel(this.repository), 'Invalid repository provided to repository instance'),
      new Test(() => this.basePath.length > 0, 'Must provide a valid base path'),
      new Test(() => this.branch.length > 0, 'Must provide a valid branch')
    ];
  }
}
