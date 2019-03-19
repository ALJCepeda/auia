import { BaseEntity } from 'abstract';
import { Change, ChangeConstructor } from 'interfaces';

export class ChangeDiffer<ModelT extends BaseEntity> {
  constructor(
    public changeList: ChangeConstructor<ModelT>[]
  ) { }

  public async diff(configModel: ModelT | undefined, entityModel:ModelT | undefined): Promise<Array<Change<ModelT>>> {
    const changes:Array<Change<ModelT>> = this.changeList.map((changeCTR) => new changeCTR());
    const changeChecks:Array<Promise<Change<ModelT>>> = changes.map((change) => change.check(configModel, entityModel));
    return Promise.all(changeChecks);
  }
}
