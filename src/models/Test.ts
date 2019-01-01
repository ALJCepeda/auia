import { Validatable } from "~interfaces";

export class Test {
	constructor(
		public valid:Assertion,
		public message:string,
		public context?:any
	){}
}

export type Assertion = (model:(any & Validatable)) => boolean;
export type Spec = (Test | Assertion);
export function isTest(obj:any):obj is Test {
	return obj instanceof Test;
}
export function isAssertion(obj:any):obj is Assertion {
	return typeof obj === 'function';
}
export function isSpec(obj:any):obj is Spec {
	return isTest(obj) || isAssertion(obj);
}
