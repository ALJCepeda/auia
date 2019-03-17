import { ConfigModel } from 'interfaces';
import { Column, PrimaryColumn } from 'typeorm';

export abstract class ChangeStore<T extends ConfigModel> {
  @PrimaryColumn()
  public id:string;

  @Column()
  public before:Date;

  constructor(
    id: string,
    before: Date = new Date()
  ) {
    this.id = id;
    this.before = before;
  }
}
