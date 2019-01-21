import "should";

import { ValidateResult, Test } from 'models';

describe.skip('ValidateResult', () => {
  it('should merge multiple validation results', () => {
    const result1 = new ValidateResult();
    result1.errorMessages = ['Failed test for result1'];

    const result2 = new ValidateResult();
    result2.errorMessages = ['Failed test for result2'];

    const result3 = new ValidateResult();
    result3.errorMessages = ['Failed test for result3'];

    const mergedResult = ValidateResult.merge(result1, result2, result3);
    mergedResult.errorMessages.should.eql([
      'Failed test for result1',
      'Failed test for result2',
      'Failed test for result3',
    ]);
  });
});
