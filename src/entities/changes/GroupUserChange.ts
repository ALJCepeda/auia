import { ResourceChange } from './ResourceChange';
import { GroupUser } from '../GroupUser';

export abstract class GroupUserChange extends ResourceChange<GroupUser> {
  public static get type():string {
    return GroupUser.type;
  }
  
  public get type():string {
    return GroupUser.type;
  };
}
