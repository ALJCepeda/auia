import { ValidateError } from './ValidateError';

export class ValidateResult {


	public static merge(source:ValidateResult, ...others:ValidateResult[]):ValidateResult {
		return this._merge(new ValidateResult(source.model), [ source, ...others ]);
	}

	protected static _merge(source:ValidateResult, others:ValidateResult[]):ValidateResult {
		return others.reduce((result, current) => {
			result.errors = result.errors.concat(current.errors);
			return result;
		}, source);
	}	public errors:Array<ValidateError<any>> = [];

	constructor(public model?:any) {}

	public isValid():boolean {
		return this.errors.length === 0;
	}

	public getErrors(model?:any):Array<ValidateError<any>> {
		return this.errors.reduce<Array<ValidateError<any>>>((result, error) => !model || (model && error.model === model) ? result.concat(error) : result, []);
	}

	public errorMessages(model?:any):string[] {
		return this.getErrors(model).reduce<string[]>((result, cur) => cur.message ? result.concat(cur.message) : result, []);
	}

	public errorIndexes(model?:any):number[] {
		return this.getErrors(model).reduce<number[]>((result, cur) => result.concat(cur.index), []);
	}

	public echoedBy(result:ValidateResult):boolean {
		return this.model === result.model && this.errors.find((error) => {
			return result.errors.find((resultError) =>
				error.model === resultError.model && error.spec === resultError.spec && error.index === resultError.index
			) !== undefined;
		}) !== undefined;
	}
}

export function isValidateResult(model:any):model is ValidateResult {
	return model instanceof ValidateResult;
}
