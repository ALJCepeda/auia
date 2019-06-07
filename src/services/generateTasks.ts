import { AnsiblePlaybook } from '../interfaces/AnsiblePlaybook';
import { Registry } from '../models/Registry';
import { HandlerDict } from './dictionaries/HandlerDict';

export function generatePlaybook(dbRegistry:Registry): AnsiblePlaybook {
  console.debug('Generating ansible tasks');
  return dbRegistry.models().reduce((playbook, model) => {
    const handler = HandlerDict.get(model.type);
    playbook[handler.class.schemaKey] = handler.task(dbRegistry);
    return playbook;
  }, {} as AnsiblePlaybook);
}
