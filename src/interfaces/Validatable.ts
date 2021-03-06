import { Spec } from '../models/Test';

export interface Validatable<T = any> {
  getSpecs:() => Array<Spec<T>>;
}

export function isValidatable<T>(obj:any): obj is Validatable<T> {
  return 'getSpecs' in obj;
}
