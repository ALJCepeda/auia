import 'tests/config';

import { User } from 'entities';
import { Change } from 'interfaces';
import { ChangeDiffer, UserChangeList } from 'services';

async function getPendingChanges(configObj?:Partial<User>, entityObj?:Partial<User>): Promise<Change<User>[]> {
  const configUser = (configObj) ? Object.assign(new User(), configObj) : undefined;
  const entityUser = (entityObj) ? Object.assign(new User(), entityObj) : undefined;
  const differ = new ChangeDiffer<User>(UserChangeList);
  const changes = await differ.diff(configUser, entityUser);
  return changes.filter((change) => change.pending);
}

describe('ChangeDiffer<User>', () => {
  it('should generate create change', async () => {
    const changes = await getPendingChanges({ name:'alfred' }, undefined);

    changes.length.should.eql(1);
    changes[0].should.have.properties({ type:'Create', pending:true, payload:'alfred' });
  });

  it('should generate delete change', async () => {
    const changes = await getPendingChanges(undefined, { name:'alfred' });

    changes.length.should.eql(1);
    changes[0].should.have.properties({ type:'Delete', pending:true, payload:'alfred' });
  });
});
