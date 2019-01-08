import { Validatable } from "~interfaces";
import { ValidateResult, Specs, isTest, isAssertion } from "~models";

export function validateModels<T extends Validatable>(models:T[]): ValidateResult<T>[] {
	return models.map(validateModel);
}

export function validateModel<T extends Validatable>(model:T): ValidateResult<T> {
	return validate(model, model.getSpecs());
}

export function validate<T>(model:T, specs:Specs<T>): ValidateResult<T> {
	return specs.reduce((result, spec, index) => {
		let isValid = true;
		if(isTest(spec)) {
			isValid = spec.valid(model);
		} else if(isAssertion(spec)) {
			isValid = spec(model);

			if(typeof(isValid) !== 'boolean') {
				throw new Error('Invalid assertion provided, must return a boolean');
			}
		}

		if(!isValid) {
			result.errored.push(spec);
			result.erroredIndexes.push(index);
		}

		return result;
	}, new ValidateResult<T>(model));
}
