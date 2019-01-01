import { User } from "./User";

export class Group{
	public sudoer:boolean = false;
	public users:User[] = [];

	constructor(public name:string) {
		this.name = name;
	}
}
