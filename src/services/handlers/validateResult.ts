import {ValidateResult} from "~models";

export const allInvalids:ValidateResult<any>[] = [];

export function handleValidateResult<T>(result:ValidateResult<T>){
	if(result.isValid() === false) {
		result.errors.forEach(error => console.error(error));
		allInvalids.push(result);
	}
}