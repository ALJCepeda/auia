import 'should';
import { Test, Validator, Specs } from 'models';
import { validateModel } from 'services';
import { Validatable, anyobject } from 'interfaces';

describe('Validator', () => {
  it('should validate any object by adding an array of specs', () => {
    const validator = new Validator<anyobject>([
      (model) => model.name.length > 0,
      (model) => model.userId > 0,
      new Test((model) => model.age > 18, 'Must be 18 or older'),
      new Test((model) => model.occupation.length > 0, 'Must have an occupation')
    ]);

    const obj = {
      name:'',
      age:0,
      occupation:'',
      userId:0
    };
    const result = validator.validate(obj);

    result.should.have.properties({
      model:obj,
      errored:validator.getSpecs(),
      erroredIndexes:[0, 1, 2, 3]
    });
    result.getErrorMessages().should.eql([ 'Must be 18 or older', 'Must have an occupation' ]);
    result.isValid().should.be.false();
  });

  it('should validate any type by adding specs', () => {
    class TestModel {
      name = '';
      age = 5;
      occupation = 'student';
      userId = 1234;
    }
    const test = new TestModel();

    const validator = new Validator<TestModel>([
      (model) => model.name.length > 0,
      (model) => model.userId > 0,
      new Test((model) => model.age > 18, 'Must be 18 or older'),
      new Test((model) => model.occupation.length > 0, 'Must have an occupation')
    ]);

    const result = validator.validate(test);

    result.should.have.properties({
      model:test,
      errored:[ validator.getSpecs()[0], validator.getSpecs()[2] ],
      erroredIndexes:[0, 2]
    });
    result.getErrorMessages().should.eql([ 'Must be 18 or older' ]);
    result.isValid().should.be.false();
  });
});

describe('Validate<ConfigModel>', () => {
  class UserModel implements Validatable {
    [key: string]: any;
    name = '';
    age = 5;
    occupation = 'student';
    userId = 1234;

    constructor(data:Partial<UserModel> = {}) {
      Object.assign(this, data);
    }

    getSpecs():Specs<UserModel> {
      return [];
    }
  }

  it('should validate true for model with no specs', () => {
    const test = new UserModel();

    const result = validateModel(test);

    result.should.have.properties({
      model:test,
      errored:[],
      erroredIndexes:[]
    });
    result.getErrorMessages().should.eql([]);
    result.isValid().should.be.true();
  });

  class UserModelWithSpecs extends UserModel {
    getSpecs():Specs<UserModelWithSpecs> {
      return [
        () => this.name.length > 0,
        model => model.userId > 0,
        new Test(model => model.age > 18, 'Must be 18 or older'),
        new Test(model => model.occupation.length > 0, 'Must have an occupation')
      ];
    }
  }
  
  it('should validate from tests defined in class', () => {
    const user = new UserModelWithSpecs();
    const result = validateModel(user);

    result.should.have.properties({
      model:user,
      errored:[ user.getSpecs()[0], user.getSpecs()[2] ],
      erroredIndexes:[0, 2]
    });
    result.getErrorMessages().should.eql([ 'Must be 18 or older' ]);
    result.isValid().should.be.false();
  });

  class Group implements Validatable {
    user:UserModelWithSpecs = new UserModelWithSpecs();
    name:string = '';

    getSpecs():Specs<Group> {
  		return [
        new Test((model) => validateModel(model.user), 'Must include a valid user for group'),
        new Test((model) => model.name.length > 0, 'Must include a name for the group')
      ];
  	}
  }

  it.only('should validate tests that return a validation result', () => {
    const group = new Group();
    const result = validateModel(group);

    console.log(result.getErrorMessages());
  });
});
