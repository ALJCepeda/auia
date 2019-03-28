import { EntityManager } from 'typeorm';
import { ResourceChange } from '../../entities/changes/ResourceChange';
import { Resource, ResourceCTR } from '../../entities/Resource';
import { ResourceDict } from '../../entities/ResourceDict';
import { aggregate } from '../aggregate';

type TargetMap = Map<string, ResourceChange<Resource>[]>
type TypeTargetMap = Map<string, TargetMap>;

export async function saveChanges(changes:ResourceChange<Resource>[], entityManager:EntityManager) {
  console.debug('Saving app changes');
  const typeMap:TypeTargetMap = mapChanges(changes);
  await saveTypeMap(typeMap, entityManager);
  console.debug('Saved app changes');
  return typeMap;
}

async function saveTypeMap(typeMap:TypeTargetMap, entityManager:EntityManager) {
  const typeSaves = Array.from(typeMap.entries()).map(async ([type, targetMap]) => {
    console.debug(`Saving all ${type} changes`);
    const resourceCTR = ResourceDict.get(type) as ResourceCTR;
    
    const targetSaves = await saveTargetMap(resourceCTR, targetMap, entityManager);
    console.debug(`Saved all ${type} changes`);
    return targetSaves;
  });
  
  return Promise.all(typeSaves);
}

async function saveTargetMap(resourceCTR:ResourceCTR, targetMap:TargetMap, entityManager:EntityManager) {
  const resourceRepository = entityManager.getRepository(resourceCTR);
  const changeRepository = entityManager.getRepository(ResourceChange);
  
  const allSaves = Array.from(targetMap.entries()).map(async ([target, changes]) => {
    console.debug(`Updating ${target} with ${changes.length} changes`);
    const model = await resourceRepository.findOne({ where: { name:target }});
    const updatedModel = aggregate(changes, model);
    const saves = await Promise.all([
      changeRepository.save(changes),
      resourceRepository.save(updatedModel)
    ]);
    console.debug(`Finished updating ${target}`);
    return saves;
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
