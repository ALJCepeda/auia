import { ResourceChangeCTR } from '../../entities/changes/ResourceChange';
import { User } from '../../entities/User';
import { Dictionary } from '../../models/Dictionary';
import { UserChangeDict } from './user/UserChangeDict';

export type ResourceChangeCTRDict = Dictionary<string, ResourceChangeCTR>;

export const ResourceChangeDict = new Dictionary([
  [ User.type, UserChangeDict ]
] as Array<[string, ResourceChangeCTRDict]>);
