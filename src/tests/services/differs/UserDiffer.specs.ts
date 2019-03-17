import 'should';

import { User } from 'models';
import { UserDiffer } from 'services';

async function getPendingChanges(configObj?:Partial<User>, entityObj?:Partial<User>) {
  const config = (configObj) ? User.from(configObj) : undefined;
  const entity = (entityObj) ? User.from(entityObj) : undefined;
  const differ = new UserDiffer(config, entity);
  const changes = await differ.diff();
  return changes.getPendingChanges();
}

describe('UserDiffer', () => {
  it('should generate create change', async () => {
    const changes = await getPendingChanges({ id:'alfred' }, undefined);

    changes.length.should.eql(1);
    changes[0].should.have.properties({ id:'Create', pending:true, payload:'alfred' });
  });

  it('should generate delete change', async () => {
    const changes = await getPendingChanges(undefined, { id:'alfred' });

    changes.length.should.eql(1);
    changes[0].should.have.properties({ id:'Delete', pending:true, payload:'alfred' });
  });
});
