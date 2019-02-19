import { User } from "./User";
import { Configuration } from "./Configuration";
import { ConfigModel } from "interfaces";

export class Group implements ConfigModel{
	public sudoer:boolean = false;
	public users:User[] = [];

	constructor(public id:string) {}

	class() {
		return 'Group';
	}

	getSpecs() {
		return [];
	}

	buildFrom(configuration:Configuration): Group{

		return this;
	}
}
