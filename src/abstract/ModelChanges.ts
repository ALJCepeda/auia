import { Column, PrimaryColumn } from 'typeorm';
import { EntityModel } from './EntityModel';

export abstract class ModelChanges<Model extends EntityModel> {
  @PrimaryColumn()
  public id:string;

  @Column()
  public createdAt:Date = new Date();

  @Column()
  public change:string;

  @Column()
  public payload:string;

  constructor(
    id:string,
    change:string,
    payload:string
  ) {
    this.id = id;
    this.change = change;
    this.payload = payload;
  }
}
