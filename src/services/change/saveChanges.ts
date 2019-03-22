import { Connection } from 'typeorm';
import { UserChange } from 'entities';
import { AppChanges } from './checkChanges';

export async function saveChanges(appChanges:AppChanges, dbConnection:Connection) {
  console.debug('Saving app changes');
  const result = await Promise.all([
    saveUsers(appChanges.users, dbConnection)
  ]);
  console.debug('Saved app changes');
  return result;
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
