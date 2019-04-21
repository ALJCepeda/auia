import { AppConfig, configure } from './configure';
import { ResourceChange } from './entities/changes/ResourceChange';
import { Resource } from './entities/Resource';
import { Registry } from './models/Registry';
import { checkChanges } from './services/change/checkChanges';
import { saveChanges } from './services/change/saveChanges';
import { generatePlaybook } from './services/generateTasks';
import { loadConfigModals } from './services/registry/loadConfigModels';
import { loadDBModels } from './services/registry/loadDBModels';
import { writePlaybook } from './services/writePlaybook';

async function run() {
  console.debug('Running application');
  const { dbConnection, configFile }:AppConfig = await configure();
  
  
  const configRegistry:Registry = loadConfigModals(configFile);
  const dbRegistry:Registry = await loadDBModels(dbConnection);
  
  const appChanges:ResourceChange<Resource>[] = await checkChanges(configRegistry, dbRegistry);
  const updatedModels = await dbConnection.transaction((entityManager) => {
    return saveChanges(appChanges, entityManager);
  });
  
  console.debug('Updating db registry');
  dbRegistry.upsert(updatedModels);
  const playbook = generatePlaybook(dbRegistry);
  await writePlaybook(playbook);
}

run().then(() => {
  console.log('Completed');
});
