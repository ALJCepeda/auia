import { DBResourceChange, ResourceChangeCTR } from '../entities/changes/ResourceChange';
import { Resource } from '../entities/Resource';
import { ResourceChangeDict } from './change/ResourceChangeDict';

export function aggregate(changes:DBResourceChange[], model?: Resource): Resource {
  return changes.reduce((result, change) => {
    const ctr:ResourceChangeCTR = ResourceChangeDict.get(change.type).get(change.name);
    const changeInst = new ctr();
    return changeInst.update(change, model);
  }, model) as Resource;
}
