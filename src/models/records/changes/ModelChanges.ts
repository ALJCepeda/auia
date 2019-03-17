import { Change } from 'interfaces';
import { Column, PrimaryColumn } from 'typeorm';
import { ConfigModel } from '../ConfigModel';

export abstract class ModelChanges<Model extends ConfigModel> {
  @PrimaryColumn()
  public id:string;

  @Column()
  public createdAt:Date = new Date();

  @Column()
  public change:string;

  @Column()
  public payload:string;

  constructor(
    id: string,
    change:Change<Model>
  ) {
    this.id = id;
    this.change = change.id;
    this.payload = change.payload;
  }
}
