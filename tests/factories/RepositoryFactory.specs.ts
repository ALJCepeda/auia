import "should";

import { RepositoryFactory } from "~factories";
import { GitRepository, Repository } from "~models";

describe('RepositoryFactory', () => {
	it('should throw error when creating repository with no type', () => {
		(() => {
			RepositoryFactory.createFromEntry({})
		}).should.throwError('Invalid type encountered: <not-set>');
	});

	it('should create a git repository', () => {
		const repo = RepositoryFactory.createFromEntry({ type:'git'} );
		repo.should.be.instanceOf(GitRepository);
	});
});
