import { Connection } from 'typeorm';
import { ResourceCTR } from '../../entities/Resource';
import { Resources } from '../../entities/ResourceDict';
import { Registry } from '../../models/Registry';
import { flatten } from '../utils/flatten';

export async function loadDBModels(dbConnection:Connection): Promise<Registry> {
  const finds = Resources.map(async (ctr:ResourceCTR) => {
    const repository = dbConnection.getRepository(ctr);
    return repository.find();
  });
  
  const entities = await Promise.all(finds);
  const dbRegistry = new Registry();
  dbRegistry.add(flatten(entities));
  
  return dbRegistry;
}
