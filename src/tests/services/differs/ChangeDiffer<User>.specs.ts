import '../../config';
import { ResourceChange } from '../../../entities/changes/ResourceChange';
import { User } from '../../../entities/User';
import { UserChanges } from '../../../services/change/user/UserChangeDict';
import { EntityDiffer } from '../../../services/EntityDiffer';

async function getPendingChanges(configObj?:Partial<User>, entityObj?:Partial<User>): Promise<ResourceChange<User>[]> {
  const configUser = Object.assign(new User(), configObj);
  const entityUser = Object.assign(new User(), entityObj);
  const differ = new EntityDiffer<User>(UserChanges);
  const changes = await differ.diff(configUser, entityUser);
  return changes.filter((change) => change.pending);
}

describe('EntityDiffer<User>', () => {
  it('should generate delete change', async () => {
    const changes = await getPendingChanges({ name:'alfred', active:false }, { active:true });

    changes.length.should.eql(1);
    changes[0].should.have.properties({ name:'Active', target:'alfred', payload:'false', pending:true });
  });
});
