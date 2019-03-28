import { Dictionary } from '../models/Dictionary';
import { Group } from './Group';
import { GroupUser } from './GroupUser';
import { Repository } from './Repository';
import { Resource, ResourceCTR } from './Resource';
import { User } from './User';
import { UserRepository } from './UserRepository';

export const Resources = [
  User,
  Group,
  Repository,
  UserRepository,
  GroupUser
];

export const ResourceDict:Dictionary<string, ResourceCTR<Resource>> = Dictionary.from(Resources, (resourceCTR) => resourceCTR.type);
