import { ConfigModel } from './ConfigModel';

export interface Action {
  payload: ConfigModel;
  pending: boolean;
  check(): Promise<boolean>;
}

export interface ActionGenerator {
  preload(): Promise<void>;
  generate(): Promise<Array<PendingActions<ConfigModel>>>;
}

export interface PendingActions<T extends ConfigModel> {
  model: T;
  actions: Action[];
}
