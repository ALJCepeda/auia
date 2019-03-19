import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export interface DBEntityChange {
  id?:number;
  type:string;
  target:string;
  payload:string;
  createdAt:Date;
}

export abstract class EntityChange<Model extends BaseEntity> {
  @PrimaryGeneratedColumn()
  public id?:number;

  @Column()
  public type:string;

  @Column()
  public target:string;

  @Column()
  public payload:string;

  @Column()
  public createdAt:Date = new Date();

  constructor(
    type:string,
    target:string,
    payload:string
  ) {
    this.type = type;
    this.target = target;
    this.payload = payload;
  }
}
