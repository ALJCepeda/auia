import { Configuration } from 'models';
import { BaseEntity } from 'entities';

export interface ConfigHandler {
  create:(data:any[]) => BaseEntity[];
  build:(models:BaseEntity[], config:Configuration) => BaseEntity[];
}
