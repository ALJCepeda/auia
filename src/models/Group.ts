import { ConfigModel } from 'interfaces';
import { Spec } from './Test';
import { User } from './User';

export class Group implements ConfigModel {
  public static classOf(model:ConfigModel) {
    return model.class() === Group;
  }

  public users:User[] = [];
  public config:any[] = [];

  constructor(public id:string) {}

  public class() {
    return Group;
  }

  public getSpecs():Array<Spec<ConfigModel>> {
    return [];
  }
}
