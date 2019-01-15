import { ValidateResult } from "models";

export class Test<T> {
	constructor(
		public valid:Spec<T>,
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

export type Assertion<T> = ((model:T) => boolean) | ((model:T) => ValidateResult);
export type Spec<T> = (Test<T> | Assertion<T>);
export function isTest<T>(obj:any):obj is Test<T> {
	return obj instanceof Test;
}

export function isAssertion<T>(obj:any):obj is Assertion<T> {
	return obj !== null;
}
