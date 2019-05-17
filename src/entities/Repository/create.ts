import { Resource, ResourceSchemaModel } from '../Resource';
import { Repository, RepositorySchemaModel } from './Repository';

export function create(datum:ResourceSchemaModel[]): Resource[] {
  return datum.map((data) => {
    const repository = new Repository();
    const model = data as RepositorySchemaModel;
  
    repository.data = model;
    repository.name = model.name;
    repository.active = model.active !== false;
  
    if(model.branch) {
      repository.branch = model.branch;
    }
    
    return repository;
  });
}
