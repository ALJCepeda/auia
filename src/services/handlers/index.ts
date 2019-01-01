import {ValidateResult} from "~models";
import { handleValidateResult } from './validateResult';

function _handle(obj:any) {
	if(obj instanceof ValidateResult) {
		handleValidateResult(obj);
	}
}
export function handle(obj:any){
	if(Array.isArray(obj)) {
		obj.forEach(entry => {
			_handle(entry);
		});
	} else {
		_handle(obj);
	}
}