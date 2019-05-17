import { Resource, ResourceSchemaModel } from '../Resource';
import { User, UserSchemaModel } from './User';

export function create(datum:ResourceSchemaModel[]): Resource[] {
  return datum.map((data) => {
    const model = data as UserSchemaModel;
    const user = new User();
  
    user.data = model;
    user.name = model.name;
    user.active = model.active !== false;
    
    return user;
  });
}
