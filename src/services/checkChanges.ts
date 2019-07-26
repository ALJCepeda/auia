import { Resource } from '../entities/Resource';
import { ResourceChange, ResourceChangeCTR } from '../entities/ResourceChange';
import { Registry } from '../models/Registry';
import { ResourceChangeDict } from './dictionaries/ResourceChangeDict';
import { ResourceDict } from './dictionaries/ResourceDict';
import { diffChanges } from './diffChanges';
import { flatten } from './utils/flatten';

export function checkChanges(configRegistry: Registry, dbRegistry: Registry): ResourceChange[] {
  console.debug('Checking for changes to registry');
  const configModels:Resource[] = configRegistry.models();
  const dbModels:Resource[] = dbRegistry.models();

  const diffChanges = configModels.map((configModel) => {
    const dbModel: Resource | undefined = dbRegistry.getMap(configModel.type).get(configModel.name);
    let diffChanges;

    if(!dbModel) {
      const create = newCreateChange(configModel);
      const ctr = ResourceDict.get(configModel.type);
      const resource = create.update(new ctr());
      const changes = checkResource(configModel, resource);
      diffChanges = [ create, ...changes ];
    } else {
      diffChanges = checkResource(configModel, dbModel);
    }

    console.log(diffChanges);
    console.debug(`Found ${ diffChanges.length } change(s) for ${configModel.name}`);
    return diffChanges;
  });

  const deactivateChanges = dbModels.filter((dbModel) => !configRegistry.getMap(dbModel.type).has(dbModel.name))
    .map((dbModel) => newDeactivateChange(dbModel));

  console.debug('Finished checking for changes to registry');
  return flatten(diffChanges).concat(deactivateChanges);
}

function checkResource(configModel:Resource, dbModel:Resource): ResourceChange[] {
  console.debug(`Diffing resource ${configModel.name}`);
  const resourceChangeCTRs:ResourceChangeCTR[] = ResourceChangeDict.get(configModel.type).values;
  return diffChanges(resourceChangeCTRs, configModel, dbModel).filter((change) => change.hasPayload);
}

function newCreateChange(configModel:Resource): ResourceChange {
  const ctr = ResourceChangeDict.get(configModel.type).get('Create');
  const change = new ctr();
  change.target = configModel.name;
  change.payload = configModel.name;
  return change;
}

function newDeactivateChange(dbModel:Resource): ResourceChange {
  const ctr = ResourceChangeDict.get(dbModel.type).get('Active');
  const change = new ctr({
    target:dbModel.name,
    payload:String(false)
  });
  return change;
}
