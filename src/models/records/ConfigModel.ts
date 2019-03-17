import { Validatable } from 'interfaces';
import { Column, PrimaryColumn } from 'typeorm';
import { Spec } from '../Test';

export abstract class ConfigModel implements Validatable<ConfigModel> {
  @PrimaryColumn()
  public id: string = 'N/A';

  @Column()
  public created:Date = new Date();

  @Column()
  public lastModified:Date = new Date();

  public data: any;

  constructor(
    id:string | undefined,
    data:any
  ) {
    if(id) {
      this.id = id;
    }

    this.data = data;
  }

  public abstract class(): string;
  public abstract getSpecs(): Array<Spec<ConfigModel>>;
}

export function isConfigModel(model:any):model is ConfigModel {
  return typeof model.id !== 'undefined' && typeof model.data !== 'undefined' && typeof model.class !== 'undefined';
}
