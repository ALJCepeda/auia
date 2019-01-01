import "should";

import { RepositoryFactory } from "~factories";
import { GitRepository, Repository } from "~models";

describe('RepositoryFactory', () => {
	it('should create repository with no name or type', () => {
		const repo = RepositoryFactory.createFromEntry({});
		repo.should.be.instanceOf(Repository);
	});

	it('should create a git repository', () => {
		const repo = RepositoryFactory.createFromEntry({ type:'git'} );
		repo.should.be.instanceOf(GitRepository);
	});
});
