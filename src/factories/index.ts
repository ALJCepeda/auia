export * from './ConfigFactory';
export * from './RepositoryFactory';
export * from './UserFactory';

import { Dictionary, ConfigModel } from 'models';
import { ConfigFactory } from './ConfigFactory';
import RepositoryFactory from './RepositoryFactory';
import UserFactory from './UserFactory';

const dictionary = new Dictionary<string, ConfigFactory<string, ConfigModel>>();
dictionary.setKeys(RepositoryFactory.getKeys(), RepositoryFactory);
dictionary.setKeys(UserFactory.getKeys(), UserFactory);

export { dictionary };
