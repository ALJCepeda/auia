import { Repository } from 'typeorm';

import { sinon } from 'tests/config';
import { DBEntityChange } from 'abstract';
import { Aggregate, User, UserChange } from 'models';
import { UserChangeMap } from 'services';

describe('Aggregate<User>', () => {
  function buildFromChanges(changes: DBEntityChange[], before?: Date) {
    const repository = new Repository<UserChange>();
    const stub = sinon.stub(repository, 'find');
    stub.returns(Promise.resolve(changes.map((change) => {
      return new UserChange(change.type, change.target, change.payload);
    })));

    const aggregate = new Aggregate<User>('alfred', repository, UserChangeMap);
    const result = aggregate.build(before);
    stub.reset();
    return result;
  }

  it('should create new user', async () => {
    const now = new Date();
    const model = await buildFromChanges([
      { type: 'Create', target: 'alfred', payload: 'alfred', createdAt: now }
    ]) as User;

    model.should.not.be.undefined();
    model.should.have.properties({
      name:'alfred',
      created:true
    });
  });
});
