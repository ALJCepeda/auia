import { Resource } from '../Resource';
import { Repository } from './Repository';

export function create(datum:Resource[]): Resource[] {
  return datum.map((data) => {
    const repository = new Repository();
    
    repository.name = data.name;
    repository.active = data.active !== false;
    repository.data = data;
  
    if(data.branch) {
      repository.branch = data.branch;
    }
    
    return repository;
  });
}
