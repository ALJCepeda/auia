import { ChangeConstructor } from 'interfaces';
import { User } from 'entities';
import { Create } from './Create';
import { Delete } from './Delete';

export const UserChange = {
  Create,
  Delete
};

export const UserChangeMap:Map<string, ChangeConstructor<User>> = new Map(Object.entries(UserChange));

export const UserChangeList = [
  Create,
  Delete
];
