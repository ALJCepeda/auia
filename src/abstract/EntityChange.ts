import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export interface EntityChangeConstructor<ModelT extends BaseEntity> {
  new (): EntityChange<ModelT>;
}

export interface DBEntityChange {
  id?:number;
  name:string;
  target:string;
  payload:string;
  createdAt:Date;
}

export abstract class EntityChange<ModelT extends BaseEntity> {
  @PrimaryGeneratedColumn()
  public id?:number;

  @Column()
  public get name(): string {
    return this.constructor.name;
  }

  @Column()
  public target:string = '';

  @Column()
  public payload:string = '';

  @Column()
  public createdAt:Date = new Date();

  public pending: boolean = false;

  public abstract check(configModel?:ModelT, entityModel?: ModelT): Promise<EntityChange<ModelT>>;
  public abstract update(model:ModelT, change:DBEntityChange): ModelT;
}
