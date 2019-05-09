import { User } from '../../entities/User/User';
import { aggregate } from '../../services/aggregate';

describe('Aggregate<User>', () => {
  it('should create new user',() => {
    const changes = [
      {type: User.type, name: 'Create', target: 'alfred', payload: 'alfred', createdAt: new Date()}
    ];
    const model = aggregate(changes, new User());
  
    model.should.not.be.undefined();
    model.should.have.properties({
      name: 'alfred'
    });
  });
});
