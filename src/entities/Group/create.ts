import { Resource, ResourceSchemaModel } from '../Resource';
import { Group, GroupSchemaModel } from './Group';

export function create(datum:ResourceSchemaModel[]): Resource[] {
  return datum.map((data) => {
    const model = data as GroupSchemaModel;
    const group = new Group();

    group.data = model;
    group.name = model.name;
    group.active = model.active !== false;

    return group;
  });
}
