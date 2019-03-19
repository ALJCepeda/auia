import { Configuration } from 'models';
import { checkChanges, ConfigChanges, generateConfiguration } from 'services';
import { AppConfig, configure } from './config';

async function run() {
  const { dbConnection }:AppConfig = await configure();
  const config:Configuration = generateConfiguration();

  const pendingChanges:ConfigChanges = await checkChanges(config, dbConnection);
  console.log(JSON.stringify(pendingChanges));
}

run().then(() => {
  console.log('Completed');
});
