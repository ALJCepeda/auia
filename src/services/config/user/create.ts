import { Resource } from '../../../entities/Resource';
import { User } from '../../../entities/User';

export function create(datum:any[]): Resource[] {
  return datum.map((data) => {
    const user = new User();
    user.name = data.name;
    user.data = data;
    return user;
  });
}
