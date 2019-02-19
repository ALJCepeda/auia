import { dictionary } from 'factories';
import { ConfigModel } from 'interfaces';
import { Configuration } from 'models';
import { handle } from './handlers/standard';
import { validateModels } from './validate';

export function generateModels(payload:any):Configuration {
	const config = new Configuration();

	Object.keys(payload).forEach(key => {
		if(dictionary.entries.has(key) === false) {
			throw new Error(`No handler for key: ${key}`);
		} else {
			const factory = dictionary.entries.get(key);
			const entry = payload[key];

			if(dictionary.canSet(factory)) {
				const models:ConfigModel[] = factory.createFromConfig(entry);
				const validations = validateModels(models);
				handle(validations);
				const validModels = validations.filter(validation => validation.isValid()).map(validation => validation.model);
				config.add(validModels);
			}
		}
	});

	return config;
}
