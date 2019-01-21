import { ValidateError } from "./ValidateError";

export class ValidateResult {
	errors:ValidateError<any>[] = [];

	constructor(public model?:any) {}

	isValid():boolean {
		return this.errors.length === 0;
	}

	getErrors(model?:any):ValidateError<any>[] {
		return this.errors.reduce<ValidateError<any>[]>((result, error) => !model || (model && error.model === model) ? result.concat(error) : result, []);
	}

	errorMessages(model?:any):string[] {
		return this.getErrors(model).reduce<string[]>((result, cur) => cur.message ? result.concat(cur.message) : result, []);
	}

	errorIndexes(model?:any):number[] {
		return this.getErrors(model).reduce<number[]>((result, cur) => result.concat(cur.index), []);
	}

	echoedBy(result:ValidateResult):boolean {
		return this.model === result.model && this.errors.find(error => {
			return result.errors.find(resultError =>
				error.model === resultError.model && error.spec === resultError.spec && error.index === resultError.index
			) !== undefined;
		}) !== undefined;
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
