import * as fs from "fs";
import * as yaml from 'js-yaml';
import { User } from '../../../entities/User';

export function loadSchema(path:string): any {
  const schema = yaml.load(fs.readFileSync(path, 'utf8'));
  
  schema.properties[User.schema.key] = User.schema;
  
  console.log(schema);
  return schema;
}
