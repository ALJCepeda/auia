import { validate } from 'services';
import { Spec } from './Test';
import { ValidateResult } from './ValidateResult';

export class Validator<T> {
	constructor(private specs:Spec<T>[] = [], validator?:Validator<T>) {
		if(validator) {
			this.addSpecs(validator.getSpecs());
		}
	}

	addSpec(spec:Spec<T>) {
		this.specs.push(spec);
		return this;
	}

	addSpecs(specs:Spec<T>[]) {
		specs.forEach((spec) => this.addSpec(spec));
		return this;
	}

	getSpecs():Spec<T>[] {
		return this.specs;
	}

	validate(obj:T): ValidateResult {
		return validate(obj, this.getSpecs());
	}
}
