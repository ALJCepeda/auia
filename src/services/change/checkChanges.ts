import { ResourceChange, ResourceChangeCTR } from '../../entities/changes/ResourceChange';
import { Resource } from '../../entities/Resource';
import { ResourceDict } from '../../entities/ResourceDict';
import { Registry } from '../../models/Registry';
import { EntityDiffer } from '../EntityDiffer';
import { flatten } from '../utils/flatten';
import { ResourceChangeDict } from './ResourceChangeDict';

export function checkChanges(configRegistry: Registry, dbRegistry: Registry): ResourceChange[] {
  console.debug('Checking for changes to registry');
  
  const configModels:Resource[] = configRegistry.models();
  const dbModels:Resource[] = dbRegistry.models();
  
  const diffChanges = configModels.map((configModel) => {
    const dbModel: Resource | undefined = dbRegistry.getMap(configModel.type).get(configModel.name);
    
    if(!dbModel) {
      const create = newCreateChange(configModel);
      const ctr = ResourceDict.get(configModel.type);
      const resource = create.update(create, new ctr());
      const changes = checkResource(configModel, resource);
      return [ create, ...changes ];
    }
  
    return checkResource(configModel, dbModel);
  });
  
  const deactivateChanges = dbModels.filter((dbModel) => !configRegistry.getMap(dbModel.type).has(dbModel.name))
    .map((dbModel) => newDeactivateChange(dbModel));

  console.debug('Finished checking for changes to registry');
  return flatten(diffChanges).concat(deactivateChanges);
}

function checkResource(configModel:Resource, dbModel:Resource): ResourceChange[] {
  console.debug(`Diffing resource ${configModel.name}`);
  const resourceChangeCTRs:ResourceChangeCTR[] = ResourceChangeDict.get(configModel.type).values;
  const differ = new EntityDiffer(resourceChangeCTRs);
  const changes = differ.diff(configModel, dbModel);
  
  const pendingChanges = changes.filter((change) => change.pending);
  console.debug(`Found ${ pendingChanges.length } change(s) for ${configModel.name}`);
  
  return pendingChanges;
}

function newCreateChange(configModel:Resource): ResourceChange {
  const ctr = ResourceChangeDict.get(configModel.type).get('Create');
  const change = new ctr();
  change.target = configModel.name;
  change.payload = configModel.name;
  change.pending = true;
  return change;
}

function newDeactivateChange(dbModel:Resource): ResourceChange {
  const ctr = ResourceChangeDict.get(dbModel.type).get('Active');
  const change = new ctr();
  change.target = dbModel.name;
  change.payload = String(false);
  change.pending = true;
  return change;
}
