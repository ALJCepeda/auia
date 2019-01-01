import RepositoryFactory from './RepositoryFactory';
import { ConfigFactory } from '~interfaces';
import { Dictionary } from '~models';

export const dictionary = new Dictionary<string, ConfigFactory>();
dictionary.setKeys(['repositories', 'repository', 'repos', 'repo', 'git', 'gits'], RepositoryFactory);

export {
	RepositoryFactory
};
