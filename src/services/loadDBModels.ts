import { Connection } from 'typeorm';
import { ResourceCTR } from '../entities/Resource';
import { Resources } from './dictionaries/ResourceDict';
import { Registry } from '../models/Registry';
import { flatten } from './utils/flatten';

export async function loadDBModels(dbConnection:Connection): Promise<Registry> {
  console.debug(`Loading database models`);
  const finds = Resources.map(async (resourceCTR:ResourceCTR) => {
    const repository = dbConnection.getRepository(resourceCTR);
    return repository.find();
  });
  
  const entities = await Promise.all(finds);
  const dbResources = flatten(entities);
  
  console.debug(`Loaded ${dbResources.length} resources`);
  const dbRegistry = new Registry();
  dbRegistry.add(dbResources);
  console.debug(`Added ${dbResources.length} resources to registry`);
  return dbRegistry;
}
