import { Validatable } from "~interfaces";
import { Test, ValidateResult, Spec, isTest, isAssertion } from "~models";

export function validateModels<T>(models:(T & Validatable)[]): ValidateResult<T>[] {
	return models.map(validateModel);
}

export function validateModel<T>(model:T & Validatable): ValidateResult<T> {
	return validate(model, model.getSpecs());
}

export function validate<T>(model:T, specs:Spec[]): ValidateResult<T> {
	return specs.reduce((result, spec:Spec, index) => {
		let isValid = true;
		if(isTest(spec)) {
			isValid = spec.valid(model as any);
		} else if(isAssertion(spec)) {
			isValid = spec(model as any);

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
