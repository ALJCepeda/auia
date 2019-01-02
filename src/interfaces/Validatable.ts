import { Spec, isSpec, Specs } from "~models";
import { anyobject } from "~interfaces";

export interface Validatable {
	getSpecs:() => Specs<any>;
}

export function isValidatable(obj:anyobject): obj is Validatable {
	return 'getSpecs' in obj && obj.specs.filter((spec:any) => !isSpec(spec)).length === 0;
}
