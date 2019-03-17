import {
  ModelChange,
  ModelChangeConstructor,
  ModelChangeDiffer,
  ModelChanges
} from 'interfaces';
import { User } from 'models';
import { CreateUser } from './CreateUser';

export const UserChangers:Array<ModelChangeConstructor<any, User>> = [
  CreateUser
];

export class UserDiffer implements ModelChangeDiffer<User> {
  constructor(
    public configModel?:User,
    public dbModel?:User
  ) {}

  public async diff(): Promise<ModelChanges<User>> {
    const changers:Array<ModelChange<any, User>> = UserChangers.map((changer) => new changer());
    const checks:Array<Promise<ModelChange<any, User>>> = changers.map((changer) => changer.check(this.configModel, this.dbModel));
    const resolvedChanges:Array<ModelChange<any, User>> = await Promise.all(checks);

    return new ModelChanges(this.dbModel, resolvedChanges);
  }
}
