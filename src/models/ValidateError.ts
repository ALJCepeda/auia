import { Spec, Test } from './Test';

export class ValidateError<T> {
	public message?:string;

	constructor(public model:T, public spec:Spec<T>, public index:number, public test?:Test<T>) {
		if(test) {
			this.message = test.message;
		}
	}
}
