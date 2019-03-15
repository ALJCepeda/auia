import { User } from 'models';
import { AppConfig, configure } from './config';
import { generateActions } from './services/config/diffDB';
import { generateConfiguration } from './services/config/generateConfiguration';

configure().then(async ({ dbConnection }:AppConfig) => {
  const configuration = generateConfiguration();
  const pendingActions = await generateActions(configuration, dbConnection);

  console.log(pendingActions);
  console.log('done');
});
