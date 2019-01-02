import { ConfigFactory } from './ConfigFactory';
import { Validatable, isValidatable } from "./Validatable";

type anyobject = { [key:string]:any };
type anyarray = { [key:number]:any };

export {
	anyobject, anyarray,
	ConfigFactory,
	Validatable, isValidatable
};
