import { Dictionary } from '../../../models/Dictionary';
import { ResourceChangeCTR } from '../../ResourceChange';
import { Active } from './Active';
import { Create } from './Create';

export const UserChanges = [
  Create,
  Active
];

export const UserChangeDict:Dictionary<string, ResourceChangeCTR> = Dictionary.from(UserChanges, (UserChange) => UserChange.name);
