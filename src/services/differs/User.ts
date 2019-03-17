import { ModelChange, ModelChangeDiffer, ModelChanges } from 'interfaces';
import { User } from 'models';
import * as UserChanges from '../changes/user';

const ChangeList = [
  UserChanges.CreateUser,
  UserChanges.DeleteUser
];

export class UserDiffer implements ModelChangeDiffer<User> {
  constructor(
    public configModel?:User,
    public dbModel?:User
  ) {}

  public async diff(): Promise<ModelChanges<User>> {
    const changes:Array<ModelChange<any, User>> = ChangeList.map((UserChange) => new UserChange());
    const changeChecks:Array<Promise<ModelChange<any, User>>> = changes.map((change) => change.check(this.configModel, this.dbModel));
    const resolvedChanges:Array<ModelChange<any, User>> = await Promise.all(changeChecks);

    return new ModelChanges(this.dbModel, resolvedChanges);
  }
}
