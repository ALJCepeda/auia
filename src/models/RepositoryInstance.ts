import * as path from 'path';

import { Repository } from "./Repository";

export class RepositoryInstance {
	constructor(
		public repository:Repository,
		public basePath:string = '~/repos',
		public branch:string = 'master') {}

	public getPath():string {
		return path.normalize(`${this.basePath}/${this.repository.name}`);
	}
}
