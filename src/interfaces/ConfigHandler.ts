import { ConfigModel } from 'interfaces';
import { Configuration } from 'models';

export interface ConfigHandler {
  create:(data:any[]) => ConfigModel[];
  build:(models:ConfigModel[], config:Configuration) => ConfigModel[];
}
