import { AnsiblePlaybook } from '../interfaces/AnsiblePlaybook';
import { Registry } from '../models/Registry';
import { HandlerDict } from './config/HandlerDict';

export function generatePlaybook(dbRegistry:Registry): AnsiblePlaybook {
  console.debug('Generating ansible tasks');
  return dbRegistry.models().reduce((playbook, model) => {
    const handler = HandlerDict.get(model.type);
    playbook[handler.key] = handler.task(dbRegistry);
    return playbook;
  }, {} as AnsiblePlaybook);
}
