import { Connection } from 'typeorm';

import { User, UserChange } from 'entities';
import { AppChanges } from './checkChanges';

export function updateModels(appChanges:AppChanges) {

}

function updateUsers(userChanges:UserChange[], dbConnection:Connection) {
  const userRepository = dbConnection.getRepository(User);
}

function mapByTarget(appChanges:AppChanges) {

}
