import { Change, ChangeDiffer, Changes } from 'interfaces';
import { User } from 'models';
import { UserChange } from '../change';

const ChangeList = [
  UserChange.Create,
  UserChange.Delete
];

export class UserDiffer implements ChangeDiffer<User> {
  constructor(
    public configModel?:User,
    public entityModel?:User
  ) {}

  public async diff(): Promise<Changes<User>> {
    const changes:Array<Change<User>> = ChangeList.map((UserChange) => new UserChange());
    const changeChecks:Array<Promise<Change<User>>> = changes.map((change) => change.check(this.configModel, this.entityModel));
    const resolvedChanges:Array<Change<User>> = await Promise.all(changeChecks);

    return new Changes(this.entityModel, resolvedChanges);
  }
}
