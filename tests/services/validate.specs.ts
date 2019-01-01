import 'should';
import { Test, ConfigModel } from '~models';
import { validateModel } from '~services';

describe('ConfigModel', () => {
  class TestModel extends ConfigModel {
    name = '';
    age = 5;
    occupation = 'student';
    userId = 1234;

    constructor(data:Partial<TestModel> = {}) {
      super();
      Object.assign(this, data);
    }
  }

  it('should validate true for model with no specs', () => {
    const test = new TestModel();

    const result = validateModel(test);

    result.should.have.properties({
      model:test,
      errored:[],
      erroredIndexes:[]
    });
    result.getErrorMessages().should.eql([]);
    result.isValid().should.be.true();
  });

  it('should validate from tests defined in class', () => {
    class UserModel extends TestModel {
      getSpecs() {
        return [
          () => this.name.length > 0,
          () => this.userId > 0,
          new Test(() => this.age > 18, 'Must be 18 or older'),
          new Test(() => this.occupation.length > 0, 'Must have an occupation')
        ];
      }
    }

    const user = new UserModel();
    const result = validateModel(user);

    result.should.have.properties({
      model:user,
      errored:[ user.getSpecs()[0], user.getSpecs()[2] ],
      erroredIndexes:[0, 2]
    });
    result.getErrorMessages().should.eql([ 'Must be 18 or older' ]);
    result.isValid().should.be.false();
  });
/*
  it('should validate by adding an array of specs', () => {
    const validator = [
      (model:any) => model.name.length > 0,
      (model:any) => model.userId > 0,
      new Test((model) => model.age > 18, 'Must be 18 or older'),
      new Test((model) => model.occupation.length > 0, 'Must have an occupation')
    ];

    const test = new TestModel();
    test.addSpecs(validator);

    const result = validateModel(test);

    result.should.have.properties({
      model:test,
      messages:[ 'Must be 18 or older' ],
      errored:[ test.specs[0], test.specs[2] ],
      erroredIndexes:[0, 2]
    });

    result.isValid().should.be.false();
  });

  it.only('should validate true for valid models', () => {
    const test = new TestModel({
      name:'Alfred',
      age:30,
      occupation:'Web Developer',
      userId:123
    });

    test.addSpecs([
      () => test.name.length > 0,
      () => test.userId > 0,
      new Test(() => test.age > 18, 'Must be 18 or older'),
      new Test(() => test.occupation.length > 0, 'Must have an occupation')
    ]);

    const result = validateModel(test);

    result.should.have.properties({
      model:test,
      messages:[],
      errored:[],
      erroredIndexes:[]
    });

    result.isValid().should.be.true();
  });*/
});
