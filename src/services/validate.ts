import { Validatable } from 'interfaces';
import { isAssertion, Spec, Test, ValidateError, ValidateResult } from 'models';

export function validateModels<T extends Validatable<T>>(models: T[]): ValidateResult[] {
  return models.map((model) => validateModel(model));
}

export function validateModel<T extends Validatable<T>>(model: T): ValidateResult {
  return validate(model, model.getSpecs());
}

function validateTest<T>(model: T, test: Test<T>, index: number): ValidateResult {
  const result = new ValidateResult(model);
  const nestedResult = runSpec(model, test.valid, index);

  if (nestedResult.isValid() === false) {
    result.errors.push(new ValidateError<T>(model, test.valid, index, test));
  }

  if (result.echoedBy(nestedResult)) {
    return result;
  }

  return ValidateResult.merge(result, nestedResult);
}

function validateAssertion<T>(model: T, spec: Spec<T>, index: number): ValidateResult {
  if (isAssertion(spec)) {
    const result = new ValidateResult(model);
    const specResult = spec(model);

    if (specResult instanceof ValidateResult) {
      return ValidateResult.merge(result, specResult);
    }

    if (typeof specResult === 'boolean') {
      if (specResult === false) {
        result.errors.push(new ValidateError<T>(model, spec, index));
      }

      return result;
    }
  }

  throw new Error('Unable to validate, spec is not an assertion');
}

function runSpec<T>(model: T, spec: Spec<T>, index: number): ValidateResult {
  if (spec instanceof Test) {
    return validateTest(model, spec, index);
  } else if (isAssertion(spec)) {
    return validateAssertion(model, spec, index);
  }

  throw new Error('Invalid spec provided, is neither a Test or Assertion');
}

export function validate<T>(model: T, specs: Array<Spec<T>>): ValidateResult {
  return specs.reduce(
    (result, spec, index) => ValidateResult.merge(result, runSpec(model, spec, index)),
    new ValidateResult(model)
  );
}
