import * as path from 'path';

import { Validatable } from 'interfaces';
import { validateModel } from 'services';
import { Repository } from './Repository';
import { Test } from './Test';

export class RepositoryInstance implements Validatable<RepositoryInstance> {

  public basePath:string = `~/repos`;
  public branch:string = `master`;

  constructor(public repository:Repository) {}

  public getPath():string {
    return path.normalize(`${this.basePath}/${this.repository.id}`);
  }

  public getSpecs() {
    return [
      new Test(() => validateModel(this.repository), 'Invalid repository provided to repository instance'),
      new Test(() => this.basePath.length > 0, 'Must provide a valid base path'),
      new Test(() => this.branch.length > 0, 'Must provie a valid branch')
    ];
  }
}
