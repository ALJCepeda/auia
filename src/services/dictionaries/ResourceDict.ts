import { Dictionary } from '../../models/Dictionary';
import { Group } from '../../entities/group/Group';
import { GroupUser } from '../../entities/GroupUser/GroupUser';
import { Repository } from '../../entities/Repository/Repository';
import { Resource, ResourceCTR } from '../../entities/Resource';
import { User } from '../../entities/User/User';
import { UserRepository } from '../../entities/UserRepository/UserRepository';

export const Resources = [
  User,
  Group,
  Repository,
  UserRepository,
  GroupUser
];

export const ResourceDict:Dictionary<string, ResourceCTR<Resource>> = Dictionary.from(Resources, (resourceCTR) => resourceCTR.type);
