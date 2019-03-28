import { ResourceChangeCTR } from '../../entities/changes/ResourceChange';
import { Resource, ResourceCTR } from '../../entities/Resource';
import { ResourceDict } from '../../entities/ResourceDict';
import { User } from '../../entities/User';
import { Dictionary } from '../../models/Dictionary';
import { UserChangeDict } from './user/UserChangeDict';

export type ResourceChangeCTRDict = Dictionary<string, ResourceChangeCTR>;
export type AllChangeCTRDict = Dictionary<ResourceCTR, ResourceChangeCTRDict>
export const ResourceChangeDict = new Dictionary([
  [ User, UserChangeDict ]
] as Array<[ResourceCTR, ResourceChangeCTRDict]>);
ResourceChangeDict.createIndex('type', (ctr:{ type:string }) => ctr.type);
ResourceChangeDict.createMatcher('resource', (resource:Resource, dictionary:AllChangeCTRDict) => {
  const resourceCTR = ResourceDict.get(resource.type);
  return dictionary.get(resourceCTR);
});
