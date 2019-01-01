import { Spec, isTest } from "./Test";

export class ValidateResult<T> {
	errored:Spec[] = [];
	erroredIndexes:number[] = [];

	constructor(public model:T) {}

	isValid():boolean {
		return this.errored.length === 0;
	}

	getErrorMessages():string[] {
		return this.errored.reduce((result, error) => {
			if(isTest(error) && error.message) {
				result.push(error.message);
			}

			return result;
		}, <string[]>[]);
	}
}
