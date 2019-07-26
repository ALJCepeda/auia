import { ResourceChangeCTR } from '../../entities/ResourceChange';
import { UserChangeDict } from '../../entities/User/changes/UserChangeDict';
import { User } from '../../entities/User/User';
import { Dictionary } from '../../models/Dictionary';

export type ResourceChangeCTRDict = Dictionary<string, ResourceChangeCTR>;

export const ResourceChangeDict = new Dictionary([
  [ User.type, UserChangeDict ]
] as Array<[string, ResourceChangeCTRDict]>);
