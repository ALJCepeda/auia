import { Repository, GitRepository, Dictionary, isRepositoryEntry } from "models";
import { ConfigFactory } from "./ConfigFactory";

type RepoCreator = (entry:any) => Repository;

export const dictionary = new Dictionary<string, RepoCreator>();
dictionary.setKeys(['git', 'gits', 'github'], (entry:any) => {
	return new GitRepository(entry);
});

dictionary.setKeys(['gitInstance'], (entry:any) => {

});

export default new ConfigFactory(dictionary);
