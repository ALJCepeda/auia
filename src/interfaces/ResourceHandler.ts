import { Resource, ResourceCTR, ResourceSchemaModel } from '../entities/Resource';
import { Registry } from '../models/Registry';
import { AnsiblePlaybook } from './AnsiblePlaybook';
import { AnsibleTask } from './AnsibleTask';

export interface ResourceHandler {
  key:keyof AnsiblePlaybook;
  class:ResourceCTR,
  type:string;
  create:(data:ResourceSchemaModel[]) => Resource[];
  associate:(models:Resource[], config:Registry) => Resource[];
  task:(config:Registry) => AnsibleTask[];
}
