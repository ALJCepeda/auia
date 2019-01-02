import { anyobject } from "~interfaces";

export class Test<T> {
	constructor(
		public valid:Assertion<T>,
		public message:string,
		public context?:any
	){}
}

export class Specs<T> extends Array<Spec<T>> {
	constructor(specs:Spec<T>[]) {
		super();
		super.push.apply(specs);
	}
};

export type Assertion<T> = (model:T) => boolean;
export type Spec<T> = (Test<T> | Assertion<T>);
export function isTest(obj:anyobject):obj is Test<anyobject> {
	return obj instanceof Test;
}
export function isAssertion(obj:anyobject):obj is Assertion<anyobject> {
	return typeof obj === 'function';
}
export function isSpec(obj:anyobject):obj is Spec<anyobject> {
	return isTest(obj) || isAssertion(obj);
}
