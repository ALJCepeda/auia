import { Resource } from '../entities/Resource';
import { ResourceChange, ResourceChangeCTR } from '../entities/ResourceChange';
import { ResourceChangeDict } from './dictionaries/ResourceChangeDict';

export function aggregate(changes:ResourceChange[], model:Resource): Resource {
  return changes.reduce((result, change) => {
    const resourceChangeCTR:ResourceChangeCTR = ResourceChangeDict.get(change.type).get(change.name);
    const changeInst = new resourceChangeCTR(change);
    return changeInst.update(result);
  }, model) as Resource;
}
