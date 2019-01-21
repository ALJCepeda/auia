import 'should';
import { Test, Validator, Spec } from 'models';
import { validateModel } from 'services';
import { Validatable, anyobject } from 'interfaces';

describe('Validator', () => {
  it('should validate any object by adding an array of specs', () => {
    const specs:Spec<anyobject>[] = [
      (model) => model.name.length > 0,
      (model) => model.userId > 0,
      new Test((model) => model.age > 18, 'Must be 18 or older'),
      new Test((model) => model.occupation.length > 0, 'Must have an occupation')
    ];
    const validator = new Validator<anyobject>(specs);

    const obj = {
      name:'',
      age:0,
      occupation:'',
      userId:0
    };
    const result = validator.validate(obj);

    result.model.should.eql(obj);
    result.errorIndexes().should.eql([0, 1, 2, 3]);
    result.errorMessages().should.eql(['Must be 18 or older', 'Must have an occupation']);
    result.errors.length.should.equal(4);
    result.errors[0].should.have.properties({ model:obj, spec:specs[0], index:0 });
    result.errors[1].should.have.properties({ model:obj, spec:specs[1], index:1 });
    result.errors[2].should.have.properties({ model:obj, spec:(specs[2] as Test<anyobject>).valid, index:2, test:specs[2], message:'Must be 18 or older' });
    result.errors[3].should.have.properties({ model:obj, spec:(specs[3] as Test<anyobject>).valid, index:3, test:specs[3], message:'Must have an occupation' });
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
    const specs:Spec<TestModel>[] = [
      (model) => model.name.length > 0,
      (model) => model.userId > 0,
      new Test((model) => model.age > 18, 'Must be 18 or older'),
      new Test((model) => model.occupation.length > 0, 'Must have an occupation')
    ];
    const validator = new Validator<TestModel>(specs);

    const result = validator.validate(test);

    result.model.should.equal(test);
    result.errorIndexes().should.eql([0, 2]);
    result.errorMessages().should.eql(['Must be 18 or older']);
    result.errors.length.should.equal(2);
    result.errors[0].should.have.properties({ model:test, spec:specs[0], index:0 });
    result.errors[1].should.have.properties({ model:test, spec:(specs[2] as Test<TestModel>).valid, index:2, test:specs[2] as Test<TestModel>, message:'Must be 18 or older'});
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

    getSpecs():Spec<UserModel>[] {
      return [];
    }
  }

  it('should validate true for model with no specs', () => {
    const test = new UserModel();

    const result = validateModel(test);

    result.model.should.equal(test);
    result.errors.should.eql([]);
    result.errorMessages().should.eql([]);
    result.errorIndexes().should.eql([]);
    result.isValid().should.be.true();
  });

  const userModelWithSpecsSpecs:Spec<UserModelWithSpecs>[] = [
    model => model.name.length > 0,
    model => model.userId > 0,
    new Test(model => model.age > 18, 'Must be 18 or older'),
    new Test(model => model.occupation.length > 0, 'Must have an occupation')
  ];

  class UserModelWithSpecs extends UserModel {
    getSpecs():Spec<UserModelWithSpecs>[] {
      return userModelWithSpecsSpecs;
    }
  }

  it('should validate from tests defined in class', () => {
    const user = new UserModelWithSpecs();

    const result = validateModel(user);

    result.model.should.equal(user);
    result.errorIndexes().should.eql([0, 2]);
    result.errorMessages().should.eql(['Must be 18 or older']);
    result.errors[0].should.have.properties({ model:user, spec:userModelWithSpecsSpecs[0], index:0 });
    result.errors[1].should.have.properties({ model:user, spec:(userModelWithSpecsSpecs[2] as Test<UserModelWithSpecs>).valid, index:2, test:userModelWithSpecsSpecs[2] as Test<UserModelWithSpecs>, message:'Must be 18 or older' });
    result.isValid().should.be.false();
  });

  class Group implements Validatable {
    user:UserModelWithSpecs = new UserModelWithSpecs();
    name:string = '';

    getSpecs():Spec<Group>[] {
  		return [
        new Test((model) => validateModel(model.user), 'Must include a valid user for group'),
        new Test((model) => model.name.length > 0, 'Must include a name for the group')
      ];
  	}
  }

  class System implements Validatable {
    group:Group = new Group();
    type:string = '';

    getSpecs():Spec<System>[] {
      return [
        new Test(model => validateModel(model.group), 'Must include a valid group for system'),
        new Test(model => model.type.length > 0, 'Must include a type for the system')
      ];
    }
  }

  it.only('should test and report on nested validations', () => {
    const system = new System();

    const result = validateModel(system);

    console.log(result);
  });
});
