import { ConfigFactory } from './ConfigFactory';
import RepositoryFactory from './RepositoryFactory';
import UserFactory from './UserFactory';

import { Dictionary, ConfigModel } from '~models';

const dictionary = new Dictionary<string, ConfigFactory<string, ConfigModel>>();
dictionary.setKeys(RepositoryFactory.getKeys(), RepositoryFactory);
dictionary.setKeys(UserFactory.getKeys(), UserFactory);

export {
	dictionary,
	ConfigFactory,
	RepositoryFactory,
	UserFactory
};
