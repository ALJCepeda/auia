import { Configuration, EntityModel } from 'models';

export interface ConfigHandler {
  create:(data:any[]) => EntityModel[];
  build:(models:EntityModel[], config:Configuration) => EntityModel[];
}
