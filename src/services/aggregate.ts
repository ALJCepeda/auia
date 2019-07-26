import { Resource } from '../entities/Resource';
import { ResourceChangeCTR } from '../entities/ResourceChange';
import { ResourceChangePayload } from '../interfaces/ResourceChangePayload';
import { ResourceChangeDict } from './dictionaries/ResourceChangeDict';

export function aggregate(changes:ResourceChangePayload[], model:Resource): Resource {
  return changes.reduce((result, change) => {
    const resourceChangeCTR:ResourceChangeCTR = ResourceChangeDict.get(change.type).get(change.name);
    const changeInst = new resourceChangeCTR(change);
    return changeInst.update(result);
  }, model) as Resource;
}
