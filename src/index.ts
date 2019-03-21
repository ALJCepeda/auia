import { Configuration } from 'models';
import { checkChanges, generateConfiguration } from 'services';
import { BaseEntity, EntityChange } from 'abstract';
import { AppConfig, configure } from './config';

async function run() {
  const { dbConnection }:AppConfig = await configure();
  const config:Configuration = generateConfiguration();

  const pendingChanges:Array<EntityChange<BaseEntity>> = await checkChanges(config, dbConnection);
  console.log(JSON.stringify(pendingChanges));
}

run().then(() => {
  console.log('Completed');
});
