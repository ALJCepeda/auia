import { ConfigModel } from 'interfaces';
import { Spec, Test } from './Test';

export class Repository implements ConfigModel {
  public static classOf(model:ConfigModel) {
    return model.class() === Repository;
  }

  public branch:string = 'master';
  public config:any = {};

  constructor(public id:string) {}

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
