import { Configuration, BaseEntity } from 'models';

export interface ConfigHandler {
  create:(data:any[]) => BaseEntity[];
  build:(models:BaseEntity[], config:Configuration) => BaseEntity[];
}
