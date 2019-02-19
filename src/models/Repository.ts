import { Test } from "./Test";
import { Configuration } from "./Configuration";
import { ConfigModel } from "interfaces";

export class Repository implements ConfigModel {
	public id:string = '';
	public origin:string = '';
	public branch:string = 'master';
	public initCommands:string[] = [];

	class() {
		return 'Repository';
	}

	getSpecs() {
		return [
			new Test(() => this.id.length >= 1, 'Repository needs a name in order to be registerd')
		];
	}

	buildFrom(configuration:Configuration): Repository {

		return this;
	}
}

export class GitRepository extends Repository {}
