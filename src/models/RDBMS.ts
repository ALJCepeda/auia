import { User } from './User';

export enum DatabasePermission {
	READ,
	WRITE,
	READWRITE,
	OWNDER
};

export class DatabaseUser extends User {
	constructor(public name:string, public database:Database, public permission:DatabasePermission) {
		super(name);
	}
}

export class Database {
	public owners:User[] = [];
	public encoding:string = 'utf8';

	constructor(public name:string) {}
}

export class RDBMS {
	public users:User[] = [];
	public databases:Database[] = [];

	constructor() {}
}

export class Postgres extends RDBMS {}
