import { ResourceChange } from '../../ResourceChange';
import { Group } from '../Group';

export abstract class GroupChange extends ResourceChange<Group> {
  public static get type():string {
    return Group.type;
  }

  public get type():string {
    return Group.type;
  }
}
