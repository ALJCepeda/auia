import { Resource } from '../Resource';
import { User, UserSchemaModel } from './User';

export function create(datum:any[]): Resource[] {
  return datum.map((data:UserSchemaModel) => {
    const user = new User();
    user.name = data.name;
    user.active = data.active !== false;
    user.data = data;
    return user;
  });
}
