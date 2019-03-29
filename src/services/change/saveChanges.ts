import { EntityManager } from 'typeorm';
import { ResourceChange } from '../../entities/changes/ResourceChange';
import { Resource, ResourceCTR } from '../../entities/Resource';
import { ResourceDict } from '../../entities/ResourceDict';
import { aggregate } from '../aggregate';
import { flatten } from '../utils/flatten';

type TargetMap = Map<string, ResourceChange<Resource>[]>
type TypeTargetMap = Map<string, TargetMap>;

export async function saveChanges(changes:ResourceChange<Resource>[], entityManager:EntityManager): Promise<Resource[]> {
  console.debug('Saving app changes');
  const typeMap:TypeTargetMap = mapChanges(changes);
  const models = await saveTypeMap(typeMap, entityManager);
  console.debug('Saved app changes');
  return models;
}

async function saveTypeMap(typeMap:TypeTargetMap, entityManager:EntityManager): Promise<Resource[]> {
  const saves = Array.from(typeMap.entries()).map(async ([type, targetMap]) => {
    console.debug(`Saving all ${type} changes`);
    const resourceCTR = ResourceDict.get(type) as ResourceCTR;
    
    const updatedModels = await saveTargetMap(resourceCTR, targetMap, entityManager);
    console.debug(`Saved all ${type} changes`);
    return updatedModels;
  });
  
  const models = await Promise.all(saves);
  return flatten(models);
}

async function saveTargetMap(resourceCTR:ResourceCTR, targetMap:TargetMap, entityManager:EntityManager): Promise<Resource[]> {
  const resourceRepository = entityManager.getRepository(resourceCTR);
  const changeRepository = entityManager.getRepository(ResourceChange);
  
  const allSaves = Array.from(targetMap.entries()).map(async ([target, changes]) => {
    console.debug(`Updating ${target} with ${changes.length} changes`);
    const model = await resourceRepository.findOne({ where: { name:target }});
    const updatedModel = aggregate(changes, model);
    await Promise.all([
      changeRepository.save(changes),
      resourceRepository.save(updatedModel)
    ]);
    console.debug(`Finished updating ${target}`);
    return updatedModel;
  });
  
  return Promise.all(allSaves);
}

function mapChanges(changes:ResourceChange<Resource>[]): TypeTargetMap {
  return changes.reduce((typeMap, change) => {
    if(!typeMap.has(change.type)) {
      typeMap.set(change.type, new Map() as TargetMap)
    }
    
    const targetMap = typeMap.get(change.type) as TargetMap;
    if(!targetMap.has(change.target)) {
      targetMap.set(change.target, []);
    }
    
    const changes = targetMap.get(change.target) as ResourceChange<Resource>[];
    changes.push(change);
    targetMap.set(change.target, changes);
    
    return typeMap;
  }, new Map() as TypeTargetMap);
}
