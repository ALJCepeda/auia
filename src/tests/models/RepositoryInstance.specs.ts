import 'should';

import { RepositoryInstance } from 'models';
import { validateModel } from 'services';

describe('RepositoryInstance', () => {
  it('should return invalid results for all fields', () => {
    const instance = new RepositoryInstance({
      basePath:'',
      branch:''
    });

    const result = validateModel(instance);
    debugger;
  });
})
