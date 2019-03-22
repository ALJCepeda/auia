import { Configuration } from 'models';
import { AppChanges, checkChanges, loadConfigModels } from 'services';
import { AppConfig, configure } from './config';
import { saveChanges } from './services/change';

async function run() {
  const { dbConnection }:AppConfig = await configure();
  const config:Configuration = loadConfigModels();

  const appChanges:AppChanges = await checkChanges(config, dbConnection);
  await saveChanges(appChanges, dbConnection);
}

run().then(() => {
  console.log('Completed');
});
