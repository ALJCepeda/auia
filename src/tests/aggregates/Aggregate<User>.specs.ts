import { User } from '../../entities/User';
import { aggregate } from '../../services/aggregate';

describe('Aggregate<User>', () => {
  it('should create new user',() => {
    const changes = [
      {type: User.type, name: 'Create', target: 'alfred', payload: 'alfred', createdAt: new Date()}
    ];
    const model = aggregate(new User(), changes);
  
    model.should.not.be.undefined();
    model.should.have.properties({
      name: 'alfred',
      created: true
    });
  });
});
