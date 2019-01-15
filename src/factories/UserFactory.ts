import { anyobject } from "~interface";
import { User, Dictionary } from "models";
import { ConfigFactory } from "./ConfigFactory";

type UserCreator = (entry:any) => User;

export const dictionary = new Dictionary<string, UserCreator>();
dictionary.setKeys(['user', 'users', 'usr', 'usrs' ], (entry:anyobject) => {
	return new User(entry.name);
});

export default new ConfigFactory(dictionary);
