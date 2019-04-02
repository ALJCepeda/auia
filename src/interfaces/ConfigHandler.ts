import { Resource } from '../entities/Resource';
import { Registry } from '../models/Registry';

export interface ConfigHandler {
  key:string,
  type:string,
  create:(data:any[]) => Resource[];
  build:(models:Resource[], config:Registry) => Resource[];
}
