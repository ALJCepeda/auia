import { Repository, GitRepository } from "~models";
import { ConfigFactory } from "~interfaces";

class RepositoryFactory implements ConfigFactory{
	createFromConfig(entry: any[]): Repository[] {
		return this.createFromEntries(entry);
	}

	createFromEntry(entry:any):Repository {
		let repository;

		switch(entry.type) {
			case 'git': repository = new GitRepository(entry);  break;
			default: repository = new Repository(entry); break;
		}

		return repository;
	}

	createFromEntries(entries:any[]):Repository[] {
		return entries.reduce((result, entry) => {
			const model = this.createFromEntry(entry);
			return [ ...result, model ];
		}, []);
	}
}

export default new RepositoryFactory();
