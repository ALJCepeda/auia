import { Changes } from 'interfaces';
import { Configuration, EntityModel } from 'models';
import { checkChanges, generateConfiguration } from 'services';
import { AppConfig, configure } from './config';

configure().then(async ({ dbConnection }:AppConfig) => {
  const config:Configuration = generateConfiguration();

  const changes:Array<Changes<EntityModel>> = await checkChanges(config, dbConnection);

  changes.forEach((change) => {
    const pendingChanges = change.getPendingChanges();
    console.log(pendingChanges);
  });
});
