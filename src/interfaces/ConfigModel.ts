import { Validatable } from './Validatable';

export interface ConfigModel extends Validatable<ConfigModel> {
  id:string;
  data:any;
  class():Function;
}

export function isConfigModel(model:any):model is ConfigModel {
  return typeof model.id !== 'undefined' && typeof model.data !== 'undefined' && typeof model.class !== 'undefined';
}