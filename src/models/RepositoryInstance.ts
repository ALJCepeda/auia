import * as path from 'path';

import { Repository } from './Repository';
import { Validatable } from 'interfaces';
import { Test } from './Test';
import { validateModel } from 'services';

export class RepositoryInstance implements Validatable<RepositoryInstance> {
	basePath:string = `~/repos`;
	branch:string = `master`;

	constructor(public repository:Repository) {}

	public getPath():string {
		return path.normalize(`${this.basePath}/${this.repository.id}`);
	}

	getSpecs() {
		return [
			new Test(() => validateModel(this.repository), 'Invalid repository provided to repository instance'),
			new Test(() => this.basePath.length > 0, 'Must provide a valid base path'),
			new Test(() => this.branch.length > 0, 'Must provie a valid branch')
		];
	}
}
