import { Spec } from "models";

export interface Validatable<T>{
	getSpecs:() => Spec<T>[];
}

export function isValidatable<T>(obj:any): obj is Validatable<T> {
	return 'getSpecs' in obj;
}
