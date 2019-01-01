import { Validatable } from "~interfaces";
import { Spec } from "./Test";

export class ConfigModel implements Validatable {
	getSpecs():Spec[] {
		return [];
	}
}
