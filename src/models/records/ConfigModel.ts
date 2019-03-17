import { Column, PrimaryColumn } from 'typeorm';

import { Validatable } from 'interfaces';
import { Spec } from '../Test';

export abstract class ConfigModel implements Validatable<ConfigModel> {
  public static from(model:Partial<ConfigModel>): ConfigModel {
    throw new Error(`ConfigModel.from needs to be implemented by subclass ${model}`);
  }

  @PrimaryColumn()
  public id: string = 'N/A';

  @Column()
  public createdAt:Date = new Date();

  @Column()
  public lastModifiedAt:Date = new Date();

  public created:boolean = false;
  public deleted:boolean = false;
  public data?: any;

  constructor(
    id?:string,
    data?:any
  ) {
    if(id) {
      this.id = id;
    }

    this.data = data;
  }

  public abstract class(): string;
  public abstract getSpecs(): Array<Spec<ConfigModel>>;
}
