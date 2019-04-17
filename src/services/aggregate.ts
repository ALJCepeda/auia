import { IDBResourceChange, ResourceChangeCTR } from '../entities/changes/ResourceChange';
import { Resource } from '../entities/Resource';
import { ResourceChangeDict } from './change/ResourceChangeDict';

export function aggregate(changes:IDBResourceChange[], model:Resource): Resource {
  return changes.reduce((result, change) => {
    const resourceChangeCTR:ResourceChangeCTR = ResourceChangeDict.get(change.type).get(change.name);
    const changeInst = new resourceChangeCTR();
    return changeInst.update(change, model);
  }, model) as Resource;
}
