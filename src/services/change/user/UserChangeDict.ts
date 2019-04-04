import { ResourceChangeCTR } from '../../../entities/changes/ResourceChange';
import { Dictionary } from '../../../models/Dictionary';
import { Create } from './Create';
import { Active } from './Active';

export const UserChanges = [
  Create,
  Active
];

export const UserChangeDict:Dictionary<string, ResourceChangeCTR> = Dictionary.from(UserChanges, (UserChange) => UserChange.name);
