import { Validatable } from "interfaces";
import { Specs } from "./Test";

export class ConfigModel implements Validatable {
	getSpecs():Specs {
		return [];
	}
}
