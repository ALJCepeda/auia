import { Resource, ResourceCTR, ResourceSchemaModel } from '../entities/Resource';
import { Registry } from '../models/Registry';
import { AnsibleTask } from './AnsibleTask';

export class ResourceHandler {
  create:(data:ResourceSchemaModel[]) => Resource[];
  associate:(models:Resource[], config:Registry) => Resource[];
  task:(config:Registry) => AnsibleTask[];

  constructor(public ctr:ResourceCTR, methods:{
    create:(data:ResourceSchemaModel[]) => Resource[],
    associate:(models:Resource[], config:Registry) => Resource[],
    task:(config:Registry) => AnsibleTask[]
  }) {
    this.create = methods.create;
    this.associate = methods.associate;
    this.task = methods.task;
  }

  get type():string {
    return this.ctr.type;
  }

  get schemaKey():string {
    return this.ctr.schemaKey
  }
}
