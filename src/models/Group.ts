import { ConfigModel } from 'interfaces';
import { Spec } from './Test';
import { User } from './User';

export class Group implements ConfigModel {
  public users:User[] = [];

  constructor(public id:string, public data:any) {}

  public class() {
    return Group;
  }

  public getSpecs():Array<Spec<ConfigModel>> {
    return [];
  }
}
