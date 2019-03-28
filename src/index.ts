import { EntityManager } from 'typeorm';
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
  return dbConnection.transaction((entityManager) => {
    return saveChanges(appChanges, entityManager);
  });
}

run().then(() => {
  console.log('Completed');
});
