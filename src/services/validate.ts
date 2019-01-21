import { Validatable } from "interfaces";
import { ValidateResult, isAssertion, Spec, Test } from "models";
import {ValidateError} from "../models/ValidateError";

export function validateModels<T extends Validatable>(models:T[]): ValidateResult[] {
	return models.map(validateModel);
}

export function validateModel<T extends Validatable>(model:T): ValidateResult {
	return validate(model, model.getSpecs());
}

function runSpec<T>(model:T, spec:Spec<T>, index:number): ValidateResult {
	let result = new ValidateResult(model);

	if(spec instanceof Test) {
		const nestedResult = runSpec(model, spec.valid, index);

		if(nestedResult.isValid() === false) {
			result.errors.push(new ValidateError<T>(model, spec.valid, index, spec));
		}
	} else if(isAssertion(spec)) {
		const specResult = spec(model);

		if(specResult instanceof ValidateResult) {
			result = ValidateResult.merge(result, specResult);
		}

		if(typeof specResult === 'boolean') {
			if(specResult === false) {
				result.errors.push(new ValidateError<T>(model, spec, index));
			}
		}
	} else {
		throw new Error('Invalid spec provided, is neither a Test or Assertion');
	}

	return result;
}

export function validate<T>(model:T, specs:Spec<T>[]): ValidateResult {
	return specs.reduce(
		(result, spec, index) => ValidateResult.merge(result, runSpec(model, spec, index)),
		new ValidateResult(model)
	);
}
