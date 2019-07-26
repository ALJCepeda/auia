import { validate } from '../services/validate';
import { Spec } from './Test';
import { ValidateResult } from './ValidateResult';

export class Validator<T> {
	constructor(private specs:Array<Spec<T>> = [], validator?:Validator<T>) {
		if(validator) {
			this.addSpecs(validator.getSpecs());
		}
	}

	public addSpec(spec:Spec<T>) {
		this.specs.push(spec);
		return this;
	}

	public addSpecs(specs:Array<Spec<T>>) {
		specs.forEach((spec) => this.addSpec(spec));
		return this;
	}

	public getSpecs():Array<Spec<T>> {
		return this.specs;
	}

	public validate(obj:T): ValidateResult {
		return validate(obj, this.getSpecs());
	}
}
