import { Repository } from 'typeorm';

import { sinon } from 'tests/config';
import { DBEntityChange } from 'abstract';
import { UserChangeMap } from 'services';
import { User } from 'entities';
import { Aggregate } from 'models';

describe('Aggregate<User>', () => {
  function buildFromChanges(changes: DBEntityChange[], before?: Date) {
    const user = new User();
    const repository = new Repository<DBEntityChange>();
    const stub = sinon.stub(repository, 'find');
    stub.returns(Promise.resolve(changes));

    const aggregate = new Aggregate<User>(user, repository, UserChangeMap);
    const result = aggregate.build(before);
    stub.reset();
    return result;
  }

  it('should create new user', async () => {
    const now = new Date();
    const model = await buildFromChanges([
      { name: 'Create', target: 'alfred', payload: 'alfred', createdAt: now }
    ]) as User;

    model.should.not.be.undefined();
    model.should.have.properties({
      name:'alfred',
      created:true
    });
  });
});
