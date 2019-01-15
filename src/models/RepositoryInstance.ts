import * as path from 'path';

import { Repository } from './Repository';
import { ConfigModel } from './ConfigModel';
import { Test } from './Test';
import { validateModel } from 'services';

export class RepositoryInstance extends ConfigModel {
	repository:Repository = new Repository();
	basePath:string = `~/repos`;
	branch:string = `master`;
	constructor(data:Partial<RepositoryInstance>) {
			super();
			Object.assign(this, data);
	}

	public getPath():string {
		return path.normalize(`${this.basePath}/${this.repository.name}`);
	}

	getSpecs() {
		return [
			...super.getSpecs(),
			new Test(() => validateModel(this.repository), 'Invalid repository provided to repository instance'),
			new Test(() => this.basePath.length > 0, 'Must provide a valid base path'),
			new Test(() => this.branch.length > 0, 'Must provie a valid branch')
		];
	}
}
