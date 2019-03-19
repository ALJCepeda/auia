import { Configuration } from 'models';
import { BaseEntity } from 'abstract';

export interface ConfigHandler {
  create:(data:any[]) => BaseEntity[];
  build:(models:BaseEntity[], config:Configuration) => BaseEntity[];
}
