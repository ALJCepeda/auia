import { Changes } from 'interfaces';
import { Configuration } from 'models';
import { BaseEntity } from 'abstract';
import { checkChanges, generateConfiguration } from 'services';
import { AppConfig, configure } from './config';

async function run() {
  const { dbConnection }:AppConfig = await configure();
  const config:Configuration = generateConfiguration();

  const pendingChanges:Array<Changes<BaseEntity>> = await checkChanges(config, dbConnection);
  console.log(JSON.stringify(pendingChanges));
}

run().then(() => {
  console.log('Completed');
});
