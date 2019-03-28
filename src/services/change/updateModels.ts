import { Connection } from 'typeorm';
import { UserChange } from '../../entities/changes/UserChange';
import { User } from '../../entities/User';


export function updateModels() {

}

function updateUsers(userChanges:UserChange[], dbConnection:Connection) {
  const userRepository = dbConnection.getRepository(User);
}

function mapByTarget() {

}
