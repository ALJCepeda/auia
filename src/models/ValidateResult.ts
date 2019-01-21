import { ValidateError } from "./ValidateError";

export class ValidateResult {
	errors:ValidateError<any>[] = [];

	constructor(public model?:any) {}

	isValid():boolean {
		return this.errors.length === 0;
	}

	errorMessages():string[] {
		return this.errors.reduce<string[]>((result, cur) => {
			if(cur.message) {
				result.push(cur.message);
			}

			return result;
		}, []);
	}

	errorIndexes():number[] {
		return this.errors.reduce<number[]>((result, cur) => result.concat(cur.index), []);
	}

	protected static _merge(source:ValidateResult, others:ValidateResult[]):ValidateResult {
		return others.reduce((result, current) => {
			result.errors = result.errors.concat(current.errors);
			return result;
		}, source);
	};

	static merge(source:ValidateResult, ...others:ValidateResult[]):ValidateResult {
		return this._merge(new ValidateResult(source.model), [ source, ...others ]);
	}
}

export function isValidateResult(model:any):model is ValidateResult {
	return model instanceof ValidateResult;
}
