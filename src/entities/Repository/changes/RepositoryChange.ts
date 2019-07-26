import { ResourceChange } from '../../ResourceChange';
import { Repository } from '../Repository';

export abstract class RepositoryChange extends ResourceChange<Repository> {
  public static get type():string {
    return Repository.type;
  }

  public get type():string {
    return Repository.type;
  }
}
