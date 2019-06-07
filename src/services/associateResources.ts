import { Resource } from '../entities/Resource';
import { AssociationOptions } from '../interfaces/AssociateOptions';

export function associateResources(resource: Resource, idModelMap: Map<string, Resource>, opts: AssociationOptions) {
  if (!resource.data) {
    throw new Error('Resource must have a data object to associate relations from');
  }
  
  const modelNames = resource.data[opts.dataKey];
  (resource as any)[opts.dataKey] = [];
  
  if (modelNames) {
    if (!Array.isArray(modelNames)) {
      throw new Error(`${opts.dataKey} must be an array of resource IDs`);
    } else {
      modelNames.forEach((modelName: string) => {
        const model = idModelMap.get(modelName);
        if (!model) {
          console.warn(`Undefined model encountered (${modelName}) while building for (${resource.id})`);
        } else {
          opts.associateClass.associate(resource, model);
        }
      });
    }
  }
}
