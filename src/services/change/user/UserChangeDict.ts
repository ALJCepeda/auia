import { ResourceChangeCTR } from '../../../entities/changes/ResourceChange';
import { Dictionary } from '../../../models/Dictionary';
import { Create } from './Create';
import { Delete } from './Delete';

export const UserChanges = [
  Create,
  Delete
];

export const UserChangeDict:Dictionary<string, ResourceChangeCTR> = Dictionary.from(UserChanges, (UserChange) => UserChange.name);
