import { IDBResourceChange, ResourceChangeCTR } from '../entities/ResourceChange';
import { Resource } from '../entities/Resource';
import { ResourceChangeDict } from './dictionaries/ResourceChangeDict';

export function aggregate(changes:IDBResourceChange[], model:Resource): Resource {
  return changes.reduce((result, change) => {
    const resourceChangeCTR:ResourceChangeCTR = ResourceChangeDict.get(change.type).get(change.name);
    const changeInst = new resourceChangeCTR();
    return changeInst.update(change, result);
  }, model) as Resource;
}
