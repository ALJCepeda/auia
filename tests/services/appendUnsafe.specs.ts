import 'should';

import { appendUnsafe } from "~services";

describe('appendUnsafe', () => {
	class TestModel {
		public name:string = 'first and last';
		public age:number = 5;
		public addresses:string[] = [ 'address1', 'address2'];
	}

	it('should append known properties', () => {
		const test = new TestModel();

    appendUnsafe(test, {
      name:'new name',
      addresses:['address3', 'address4']
    });

    test.should.have.properties({
			name:'new name',
			age:5,
			addresses:['address1', 'address2', 'address3', 'address4']
		});
	});
});
