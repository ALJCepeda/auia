export class ValidateResult {
	erroredIndexes:number[] = [];
	errorMessages:string[] = [];

	constructor(public model?:any) {}

	isValid():boolean {
		return this.erroredIndexes.length === 0;
	}

	protected static _merge(source:ValidateResult, others:ValidateResult[]):ValidateResult {
		return others.reduce((result, current) => {
			result.erroredIndexes = result.erroredIndexes.concat(current.erroredIndexes);
			result.errorMessages = result.errorMessages.concat(current.errorMessages);
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
