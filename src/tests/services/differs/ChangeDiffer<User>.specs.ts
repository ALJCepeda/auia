import 'tests/config';

import { User } from 'entities';
import { EntityDiffer, UserChangeList } from 'services';
import { EntityChange } from 'abstract';

async function getPendingChanges(configObj?:Partial<User>, entityObj?:Partial<User>): Promise<EntityChange<User>[]> {
  const configUser = (configObj) ? Object.assign(new User(), configObj) : undefined;
  const entityUser = (entityObj) ? Object.assign(new User(), entityObj) : undefined;
  const differ = new EntityDiffer<User>(UserChangeList);
  const changes = await differ.diff(configUser, entityUser);
  return changes.filter((change) => change.pending);
}

describe('EntityDiffer<User>', () => {
  it('should generate create change', async () => {
    const changes = await getPendingChanges({ name:'alfred' }, undefined);

    changes.length.should.eql(1);
    changes[0].should.have.properties({ name:'Create', pending:true, payload:'alfred' });
  });

  it('should generate delete change', async () => {
    const changes = await getPendingChanges(undefined, { name:'alfred' });

    changes.length.should.eql(1);
    changes[0].should.have.properties({ name:'Delete', pending:true, payload:'alfred' });
  });
});
