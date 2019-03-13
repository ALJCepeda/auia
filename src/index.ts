import { User } from 'models';
import { AppConfig, configure } from './config';
import { generateConfiguration } from './services/config/generateConfiguration';

console.log('Before Config');
configure().then(({ dbConnection }:AppConfig) => {
  const userRepository = dbConnection.getRepository(User);
  const configuration = generateConfiguration();
  console.log(configuration.users.get('alfred'));
  console.log('done');
});
