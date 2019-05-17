import * as fs from "fs";
import * as yaml from 'js-yaml';
import { Repository } from '../../entities/Repository/Repository';
import { User } from '../../entities/User/User';

export function loadSchema(path:string): any {
  const schema = yaml.load(fs.readFileSync(path, 'utf8'));
  
  schema.properties[User.schemaKey] = User.getSchema();
  schema.properties[Repository.schemaKey] = Repository.getSchema();
  
  return schema;
}
