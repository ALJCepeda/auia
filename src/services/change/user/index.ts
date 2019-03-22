import { User } from 'entities';
import { EntityChangeConstructor } from '../EntityChange';
import { Create } from './Create';
import { Delete } from './Delete';

export const UserChange = {
  Create,
  Delete
};

export const UserChangeMap:Map<string, EntityChangeConstructor<User>> = new Map(Object.entries(UserChange));

export const UserChangeList = [
  Create,
  Delete
];
