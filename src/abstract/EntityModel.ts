import { Column, PrimaryColumn } from 'typeorm';

import { Validatable } from 'interfaces';
import { Spec } from 'models';

export abstract class EntityModel implements Validatable<EntityModel> {
  public static from(model:Partial<EntityModel>): EntityModel {
    throw new Error(`EntityModel.from needs to be implemented by subclass ${model}`);
  }

  public name:string = 'N/A';
  @PrimaryColumn()
  public get id():string {
    return this.name;
  }

  public set id(name:string) {
    this.name = name;
  }

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
  public abstract getSpecs(): Array<Spec<EntityModel>>;
}

export function isEntityModel(model:any): model is EntityModel {
  return typeof model.id === 'string' &&
         typeof model.class === 'function' &&
         typeof model.getSpecs === 'function' &&
         typeof model.created === 'boolean' &&
         typeof model.deleted === 'boolean' &&
         typeof model.lastModifiedAt === 'object' &&
         model.lastModifiedAt.constructor.name === 'Date' &&
         typeof model.createdAt === 'object' &&
         model.createdAt.constructor.name === 'Date';
}
