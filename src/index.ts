import { AppConfig, configure } from './config';
import { ResourceChange } from './entities/changes/ResourceChange';
import { Resource } from './entities/Resource';
import { Registry } from './models/Registry';
import { checkChanges } from './services/change/checkChanges';
import { saveChanges } from './services/change/saveChanges';
import { loadConfigModels } from './services/registry/loadConfigModels';
import { loadDBModels } from './services/registry/loadDBModels';

async function run() {
  const { dbConnection }:AppConfig = await configure();
  const configRegistry:Registry = loadConfigModels();
  const dbRegistry:Registry = await loadDBModels(dbConnection);
  
  const appChanges:ResourceChange<Resource>[] = await checkChanges(configRegistry, dbRegistry);
  await saveChanges(appChanges, dbConnection);
}

run().then(() => {
  console.log('Completed');
});
