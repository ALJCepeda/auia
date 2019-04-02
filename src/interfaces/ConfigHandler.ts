import { Resource } from '../entities/Resource';
import { Registry } from '../models/Registry';
import { AnsiblePlaybook } from './AnsiblePlaybook';
import { AnsibleTask } from './AnsibleTask';

export interface ConfigHandler {
  key:keyof AnsiblePlaybook;
  type:string;
  create:(data:any[]) => Resource[];
  build:(models:Resource[], config:Registry) => Resource[];
  task:(config:Registry) => AnsibleTask[];
}
