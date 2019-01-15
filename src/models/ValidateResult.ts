import { Specs, isTest } from "./Test";
import { Validatable } from "interfaces";

export class ValidateResult {
	model:any = null ;
	errored:Specs = [];
	erroredIndexes:number[] = [];

	constructor(data:Partial<ValidateResult>) {
		Object.assign(this, data);
	}

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

	static merge(source:ValidateResult, ...others:ValidateResult[]):ValidateResult {
		const result = others.reduce((newResult, result) => {
			newResult.errored = newResult.errored.concat(result.errored);
			newResult.erroredIndexes = newResult.erroredIndexes.concat(result.erroredIndexes);
			return newResult;
		}, new ValidateResult(source));

		return result;
	}
}

export function isValidateResult(model:any):model is ValidateResult {
	return model instanceof ValidateResult;
}
