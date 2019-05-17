import * as path from 'path';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Spec, Test } from '../../models/Test';
import { validateModel } from '../../services/validate';
import { Resource, ResourceAssociationCTR } from '../Resource';
import { Repository } from '../Repository/Repository';
import { User } from '../User/User';

@Entity('user-repositories')
export class UserRepository extends Resource {
  public get name(): string {
    return path.normalize(`${this.basePath}/${this.repository.id}`);
  }

  @Column()
  public basePath:string = `~/repos`;

  @Column()
  public branch:string = `master`;

  @ManyToOne(() => User, (user) => user.id)
  public user:User = new User();

  @ManyToOne(() => Repository, (repository) => repository.id)
  public repository:Repository = new Repository();

  public getSpecs(): Array<Spec<Resource>> {
    return [
      new Test(() => validateModel(this.repository), 'Invalid repository provided to repository instance'),
      new Test(() => this.basePath.length > 0, 'Must provide a valid base path'),
      new Test(() => this.branch.length > 0, 'Must provide a valid branch')
    ];
  }
  
  static associate(user:User, repository:Repository): UserRepository {
    const userRepository = new UserRepository();
    userRepository.user = user;
    userRepository.repository = repository;
  
    (user.repositories as UserRepository[]).push(userRepository);
    user.repositoryMap.set(repository.name, userRepository);
    return userRepository;
  }
}
