import { Validatable, isValidatable } from "~interfaces";
import { validate } from "~services";
import { Spec } from "./Test";
import { ValidateResult } from "./ValidateResult";

export class Validator implements Validatable {
	constructor(public model:any, public specs:Spec[] = []) {
		if(isValidatable(model)) {
			this.addSpecs(model.getSpecs());
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

	validate():ValidateResult<any> {
		return validate(this.model, this.getSpecs());
	}
}
