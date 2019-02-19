import { ValidateResult, ValidateError } from "models";

export const allInvalids:ValidateResult[] = [];

export function handleValidateResult<T>(result:ValidateResult){
	if(result.isValid() === false) {
		result.getErrors().forEach((error: ValidateError<T>) => console.log(error.message))
		allInvalids.push(result);
	}
}
