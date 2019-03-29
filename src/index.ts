import { AppConfig, configure } from './config';
import { ResourceChange } from './entities/changes/ResourceChange';
import { Resource } from './entities/Resource';
import { Registry } from './models/Registry';
import { checkChanges } from './services/change/checkChanges';
import { saveChanges } from './services/change/saveChanges';
import { loadConfigModels } from './services/registry/loadConfigModels';
import { loadDBModels } from './services/registry/loadDBModels';

async function run() {
  console.debug('Running application');
  const { dbConnection }:AppConfig = await configure();
  const configRegistry:Registry = loadConfigModels();
  const dbRegistry:Registry = await loadDBModels(dbConnection);
  
  const appChanges:ResourceChange<Resource>[] = await checkChanges(configRegistry, dbRegistry);
  const updatedModels = await dbConnection.transaction((entityManager) => {
    return saveChanges(appChanges, entityManager);
  });
  
  console.debug('Updating db registry');
  dbRegistry.upsert(updatedModels);
  debugger;
}

run().then(() => {
  console.log('Completed');
});
