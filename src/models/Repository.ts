import { ConfigModel } from 'interfaces';
import { Spec, Test } from './Test';

export class Repository implements ConfigModel {
  public branch:string = 'master';

  constructor(public id:string, public data:any) {}

  public class() {
    return Repository;
  }

  public getSpecs():Array<Spec<ConfigModel>> {
    return [
      new Test(() => this.id.length >= 1, 'Repository needs a name in order to be registerd')
    ];
  }
}

export class GitRepository extends Repository {}
