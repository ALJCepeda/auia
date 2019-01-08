import { Validatable, isValidatable, anyobject } from "~interfaces";
import { validate } from "~services";
import { Spec, Specs } from "./Test";
import { ValidateResult } from "./ValidateResult";


export class Validator<T extends anyobject> implements Validatable {
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

	validate(model:T):ValidateResult<T> {
		return validate<T>(model, this.getSpecs());
	}
}
