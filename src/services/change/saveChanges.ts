import { Connection, Repository } from 'typeorm';
import { ResourceChange } from '../../entities/changes/ResourceChange';
import { UserChange } from '../../entities/changes/UserChange';
import { Resource, ResourceCTR } from '../../entities/Resource';
import { ResourceDict } from '../../entities/ResourceDict';

type TargetMap = Map<string, ResourceChange<Resource>[]>
type TypeTargetMap = Map<string, TargetMap>;

export async function saveChanges(changes:ResourceChange<Resource>[], dbConnection:Connection) {
  console.debug('Saving app changes');
  const typeMap:TypeTargetMap = mapChanges(changes);
  
  console.debug('Saved app changes');
  return typeMap;
}

function saveTypeMap(typeMap:TypeTargetMap, dbConnection:Connection) {
  return Array.from(typeMap.entries()).map((typeMapEntry) => {
    const [ type, targetMap ] = typeMapEntry;
    const ctr = ResourceDict.get(type) as ResourceCTR;
    const repository = dbConnection.getRepository(ctr);
    return saveTargetMap(targetMap, repository);
  });
}

function saveTargetMap(targetMap:TargetMap, repository:Repository<Resource>) {
  return Array.from(targetMap.entries()).map((targetMapEntry) => {
    const [ target, changes ] = targetMapEntry;
    const model = repository.findOne({ where: { name:target }});
    
  });
  const model = repository.findOne()
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

async function saveUsers(changes:UserChange[], dbConnection:Connection) {
  console.debug(`Saving ${changes.length} user changes`);
  const insert = await dbConnection.createQueryBuilder()
    .insert()
    .into(UserChange)
    .values(changes)
    .execute();
  
  console.log(`Saved ${changes.length} user changes`);
  return insert;
}
