import { ValidateResult } from '../../../models/ValidateResult';
import { handleValidateResult } from './validateResult';

function _handle(obj:any) {
  if(obj instanceof ValidateResult) {
    handleValidateResult(obj);
  }
}
export function handle(obj:any): void {
  if(Array.isArray(obj)) {
    obj.forEach((entry) => _handle(entry));
  } else {
    _handle(obj);
  }
}
