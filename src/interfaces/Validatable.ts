import { Spec, isSpec } from "~models";

export interface Validatable {
	getSpecs:() => Spec[];
}

export function isValidatable(obj:any): obj is Validatable {
	return 'getSpecs' in obj && obj.specs.filter((spec:any) => !isSpec(spec)).length === 0;
}
