import "should";

import { ValidateResult, Test } from 'models';

describe('ValidateResult', () => {
  it('should merge multiple validation results', () => {
    const result1 = new ValidateResult({
      errored: [ new Test(() => false, 'Failed test for result1') ]
    });

    const result2 = new ValidateResult({
      errored: [ new Test(() => false, 'Failed test for result2') ]
    });

    const result3 = new ValidateResult({
      errored: [ new Test(() => false, 'Failed test for result3') ]
    });

    const mergedResult = ValidateResult.merge(result1, result2, result3);
    mergedResult.getErrorMessages().should.eql([
      'Failed test for result1',
      'Failed test for result2',
      'Failed test for result3',
    ]);
  });
});
