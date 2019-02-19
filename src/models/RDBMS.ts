import { User } from './User';
import { Configuration } from './Configuration';
import { ConfigModel } from "interfaces";

export enum DatabasePermission {
	READ,
	WRITE,
	READWRITE,
	OWNDER
};

export class DatabaseUser extends User {

}

export class Database {
	public owners:User[] = [];
	public encoding:string = 'utf8';

	constructor(public name:string) {}
}

export class RDBMS implements ConfigModel {
	public users:User[] = [];
	public databases:Database[] = [];

	constructor(public id:string) {}

	class() {
		return 'RDBMS';
	}

	getSpecs() {
		return [];
	}

	buildFrom(configuration:Configuration): RDBMS {

		return this;
	}
}

export class Postgres extends RDBMS {}
