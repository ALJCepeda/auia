import '../../config';
import { ResourceChange } from '../../../entities/changes/ResourceChange';
import { User } from '../../../entities/User';
import { UserChanges } from '../../../services/change/user/UserChangeDict';
import { EntityDiffer } from '../../../services/EntityDiffer';

async function getPendingChanges(configObj?:Partial<User>, entityObj?:Partial<User>): Promise<ResourceChange<User>[]> {
  const configUser = (configObj) ? Object.assign(new User(), configObj) : undefined;
  const entityUser = (entityObj) ? Object.assign(new User(), entityObj) : undefined;
  const differ = new EntityDiffer<User>(UserChanges);
  const changes = await differ.diff(configUser, entityUser);
  return changes.filter((change) => change.pending);
}

describe('EntityDiffer<User>', () => {
  it('should generate create change', async () => {
    const changes = await getPendingChanges({ name:'alfred' }, undefined);

    changes.length.should.eql(1);
    changes[0].should.have.properties({ name:'Create', target:'alfred', payload:'alfred', pending:true });
  });

  it('should generate delete change', async () => {
    const changes = await getPendingChanges(undefined, { name:'alfred' });

    changes.length.should.eql(1);
    changes[0].should.have.properties({ name:'Active', target:'alfred', payload:'', pending:true });
  });
});
