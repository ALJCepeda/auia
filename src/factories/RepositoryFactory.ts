import { Repository, GitRepository, Dictionary } from "~models";
import { ConfigFactory } from "./ConfigFactory";

type RepoCreator = (entry:any) => Repository;

export const dictionary = new Dictionary<string, RepoCreator>();
dictionary.setKeys(['git', 'gits', 'github' ], (entry) => {
	return new GitRepository(entry);
});

export default new ConfigFactory(dictionary);
