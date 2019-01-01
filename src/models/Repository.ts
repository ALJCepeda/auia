import { Test } from "./Test";
import { ConfigModel } from "./ConfigModel";

export class Repository extends ConfigModel {
	public name:string = '';
	public origin:string = '';
	public branch:string = 'master';
	public initCommands:string[] = [];

	constructor(data:Partial<Repository>) {
		super();
		Object.assign(this, data);
	}

	getSpecs() {
		return [
			...super.getSpecs(),
			new Test(() => this.name.length >= 1, 'Repository needs a name in order to be created')
		]
	}
}

export class GitRepository extends Repository {}
