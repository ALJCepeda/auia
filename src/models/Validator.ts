import { validate } from 'services';
import { Spec, Specs } from './Test';
import { ValidateResult } from './ValidateResult';

export class Validator<T> {
	constructor(private specs:Specs<T> = [], validator?:Validator<T>) {
		if(validator) {
			this.addSpecs(validator.getSpecs());
		}
	}

	addSpec(spec:Spec<T>) {
		this.specs.push(spec);
		return this;
	}

	addSpecs(specs:Specs<T>) {
		specs.forEach((spec) => this.addSpec(spec));
		return this;
	}

	getSpecs():Specs<T> {
		return this.specs;
	}

	validate(obj:T): ValidateResult {
		return validate(obj, this.getSpecs());
	}
}
