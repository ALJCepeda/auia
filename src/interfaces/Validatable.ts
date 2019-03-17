import { Spec } from 'models';

export interface Validatable<T> {
  getSpecs:() => Array<Spec<T>>;
}

export function isValidatable<T>(obj:any): obj is Validatable<T> {
  return 'getSpecs' in obj;
}
