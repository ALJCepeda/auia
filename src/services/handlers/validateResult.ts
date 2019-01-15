import {ValidateResult} from "models";

export const allInvalids:ValidateResult<any>[] = [];

export function handleValidateResult<T>(result:ValidateResult<T>){
	if(result.isValid() === false) {
		result.getErrorMessages().forEach((errorMessage:string) => console.error(errorMessage));
		allInvalids.push(result);
	}
}
