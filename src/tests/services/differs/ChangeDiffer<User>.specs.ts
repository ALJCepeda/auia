import { ResourceChange } from '../../../entities/ResourceChange';
import { UserChanges } from '../../../entities/User/changes/UserChangeDict';
import { User } from '../../../entities/User/User';
import { diffChanges } from '../../../services/diffChanges';
import '../../config';

async function getPendingChanges(configObj?:Partial<User>, entityObj?:Partial<User>): Promise<Array<ResourceChange<User>>> {
  const configUser = Object.assign(new User(), configObj);
  const entityUser = Object.assign(new User(), entityObj);
  return diffChanges(UserChanges, configUser, entityUser).filter((change) => change.hasPayload);
}

describe('EntityDiffer<User>', () => {
  it('should generate delete change', async () => {
    const changes = await getPendingChanges({ name:'alfred', active:false }, { active:true });

    changes.length.should.eql(1);
    changes[0].should.have.properties({ name:'Active', target:'alfred', payload:'false', hasPayload:true });
  });
});
