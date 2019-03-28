import { Check, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Validatable } from 'interfaces';
import { Spec } from '../models/Test';

export interface ResourceCTR<ResourceT extends Resource = Resource> {
  new():ResourceT;
  type:string;
}

@Unique(['name'])
@Check('name <> ""')
@Check('id <> -1')
export abstract class Resource implements Validatable<Resource> {
  public static get type():string {
    return this.name;
  }
  
  public get type():string {
    return this.constructor.name;
  };
  
  @PrimaryGeneratedColumn()
  public id:number = -1;
  
  private _name = '';
  @Column()
  public get name():string {
    return this._name;
  }
  public set name(name:string) {
    this._name = name;
  }

  @Column()
  public createdAt:Date = new Date();

  @Column()
  public lastModifiedAt:Date = new Date();

  public created:boolean = false;
  public deleted:boolean = false;
  public data:any = {};
  
  public abstract getSpecs(): Array<Spec<Resource>>;
}
