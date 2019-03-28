import { DBResourceChange, ResourceChangeCTR } from '../entities/changes/ResourceChange';
import { Resource } from '../entities/Resource';
import { ResourceChangeDict } from './change/ResourceChangeDict';

export function aggregate<ResourceT extends Resource>(model: ResourceT, changes:DBResourceChange[]): ResourceT {
  return changes.reduce((result, change) => {
    const ctr:ResourceChangeCTR<ResourceT> = ResourceChangeDict.byIndex('type', change.type).get(change.name) as ResourceChangeCTR<ResourceT>;
    const changeInst = new ctr();
    return changeInst.update(model, change);
  }, model);
}
