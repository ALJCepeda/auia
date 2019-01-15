import { isSpec, Specs } from "models";

export interface Validatable{
	getSpecs:() => Specs;
}

export function isValidatable(obj:any): obj is Validatable {
	return 'getSpecs' in obj && obj.specs.filter((spec:any) => !isSpec(spec)).length === 0;
}
