import { ConfigModel } from "~models";

export interface ConfigFactory {
	createFromConfig(entry:any):ConfigModel[];
}
