import { User } from './User';

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
