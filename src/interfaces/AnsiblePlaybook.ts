import { AnsibleTask } from './AnsibleTask';

export interface AnsiblePlaybook {
  [index:string]: AnsibleTask[]
  users: AnsibleTask[];
}
