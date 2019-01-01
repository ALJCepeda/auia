import { Repository } from "./Repository";

export class RepositoryInstance {
	public path:string = '';
	constructor(
		public repository:Repository,
		public branch:string = 'master') {
		this.path = `~/repos/${this.repository.name}`;
	}
}
