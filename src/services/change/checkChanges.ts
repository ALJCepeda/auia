import { ResourceChange, ResourceChangeCTR } from '../../entities/changes/ResourceChange';
import { Resource } from '../../entities/Resource';
import { Registry } from '../../models/Registry';
import { EntityDiffer } from '../EntityDiffer';
import { flatten } from '../utils/flatten';
import { ResourceChangeDict } from './ResourceChangeDict';

export function checkChanges(configRegistry: Registry, dbRegistry: Registry): ResourceChange[] {
  console.debug('Checking for changes to registry');
  
  const configChanges = configRegistry.models().map((configModel) => {
    const dbModel: Resource | undefined = dbRegistry.getMap(configModel.type).get(configModel.name);
    return checkResource(configModel, dbModel);
  });
  
  const deletedChanges = checkRemoved(configRegistry, dbRegistry);

  console.debug('Finished checking for changes to registry');
  return flatten(configChanges).concat(deletedChanges);
}

function checkResource(configModel:Resource, dbModel?:Resource): ResourceChange[] {
  console.debug(`Diffing resource ${configModel.name}`);
  const resourceChangeCTRs:ResourceChangeCTR[] = ResourceChangeDict.get(configModel.type).values;
  const differ = new EntityDiffer(resourceChangeCTRs);
  const changes = differ.diff(configModel, dbModel);
  
  const pendingChanges = changes.filter((change) => change.pending);
  console.debug(`Found ${ pendingChanges.length } change(s) for ${configModel.name}`);
  
  return pendingChanges;
}

function checkRemoved(configRegistry:Registry, dbRegistry:Registry): ResourceChange[] {
  console.debug(`Checking for removed resources`);
  
  const dbModels = dbRegistry.models();
  const configModels = configRegistry.models();
  const removedModels = dbModels.filter((dbModel) => {
    return dbModel.active && !configModels.find((configModel) => configModel.name === dbModel.name && configModel.type === configModel.type);
  });
  
  console.debug(`Removed resources: ${removedModels.length}`);
  return removedModels.map((removedModel) => {
    const ctr = ResourceChangeDict.get(removedModel.type).get('Active');
    const change = new ctr();
    change.target = removedModel.name;
    change.pending = true;
    return change;
  });
}
