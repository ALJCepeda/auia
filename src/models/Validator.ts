import { Validatable, isValidatable } from "~interfaces";
import { validate } from "~services";
import { Spec } from "./Test";
import { ValidateResult } from "./ValidateResult";


export class Validator<T> implements Validatable {
	constructor(private specs:Spec[] = [], validator?:Validator<T>) {
		if(validator) {
			this.addSpecs(validator.getSpecs());
		}
	}

	addSpec(spec:Spec) {
		this.specs.push(spec);
		return this;
	}

	addSpecs(specs:Spec[]) {
		specs.forEach((spec) => this.addSpec(spec));
		return this;
	}

	getSpecs():Spec[] {
		return this.specs;
	}

	validate(model:T):ValidateResult<T> {
		return validate<T>(model, this.getSpecs());
	}
}
