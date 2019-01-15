import { Validatable } from "interfaces";
import { ValidateResult, Specs, isValidateResult, isTest, isAssertion, Spec } from "models";

export function validateModels<T extends Validatable>(models:T[]): ValidateResult[] {
	return models.map(validateModel);
}

export function validateModel<T extends Validatable>(model:T): ValidateResult {
	return validate(model, model.getSpecs());
}

function runSpec<T>(model:T, spec:Spec<T>):boolean | ValidateResult {
	if(isTest(spec)) {
		return runSpec(model, spec.valid);
	}

	if(isAssertion(spec)) {
		return spec(model);
	}

	throw new Error('Invalid spec provided, is neither a Test or Assertion');
}

export function validate<T>(model:T, specs:Specs<T>): ValidateResult {
	return specs.reduce((result:ValidateResult, spec, index) => {
		let isValid:boolean | ValidateResult = runSpec(model, spec);

		if(isValidateResult(isValid)) {
			return ValidateResult.merge(result, isValid);
		} else if(typeof(isValid) === 'boolean') {
			if(isValid === false) {
				result.errored.push(spec);
				result.erroredIndexes.push(index);
			}

			return result;
		}

		throw new Error('Invalid assertion provided, must return a boolean or ValidateResult');
	}, new ValidateResult({ model }));
}
