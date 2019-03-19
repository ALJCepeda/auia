import 'tests/config';

import { User } from 'entities';
import { UserDiffer } from 'services';

async function getPendingChanges(configObj?:Partial<User>, entityObj?:Partial<User>) {
  const config = (configObj) ? Object.assign(new User(), configObj) : undefined;
  const entity = (entityObj) ? Object.assign(new User(), entityObj) : undefined;
  const differ = new UserDiffer(config, entity);
  const changes = await differ.diff();
  return changes.getPendingChanges();
}

describe('UserDiffer', () => {
  it('should generate create change', async () => {
    const changes = await getPendingChanges({ name:'alfred' }, undefined);

    changes.length.should.eql(1);
    changes[0].should.have.properties({ id:'Create', pending:true, payload:'alfred' });
  });

  it('should generate delete change', async () => {
    const changes = await getPendingChanges(undefined, { name:'alfred' });

    changes.length.should.eql(1);
    changes[0].should.have.properties({ id:'Delete', pending:true, payload:'alfred' });
  });
});
