import { Check, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Validatable } from 'interfaces';
import { Spec } from 'models';

@Unique(['name'])
@Check('name <> ""')
@Check('id <> -1')
export abstract class BaseEntity implements Validatable<BaseEntity> {
  @PrimaryGeneratedColumn()
  public id:number = -1;
  
  @Column()
  public name:string = '';

  @Column()
  public createdAt:Date = new Date();

  @Column()
  public lastModifiedAt:Date = new Date();

  public created:boolean = false;
  public deleted:boolean = false;
  public data:any = {};

  public get className():string {
    return this.constructor.name;
  };
  
  public abstract getSpecs(): Array<Spec<BaseEntity>>;
}

export function isEntityModel(model:any): model is BaseEntity {
  return typeof model._name === 'string' &&
         typeof model.class === 'function' &&
         typeof model.getSpecs === 'function' &&
         typeof model.created === 'boolean' &&
         typeof model.deleted === 'boolean' &&
         typeof model.isActive === 'boolean' &&
         typeof model.lastModifiedAt === 'object' &&
         model.lastModifiedAt.constructor.name === 'Date' &&
         typeof model.createdAt === 'object' &&
         model.createdAt.constructor.name === 'Date';
}
