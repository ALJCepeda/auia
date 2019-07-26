import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Resource } from './Resource';

export interface ResourceChangeCTR<ModelT extends Resource = Resource> {
  type:string;
  new (...args:any[]): ResourceChange<ModelT>;
}

@Entity('entity-changes')
export abstract class ResourceChange<ModelT extends Resource = Resource> {
  public static get type():string {
    return Resource.type;
  }

  @Column()
  public get type():string {
    return Resource.type;
  }

  @Column()
  public get name(): string {
    return this.constructor.name;
  }

  public get hasPayload(): boolean {
    return this.payload !== '';
  }

  @PrimaryGeneratedColumn()
  public id?:number;

  @Column()
  public target:string = '';

  @Column()
  public payload:string = '';

  @Column()
  public createdAt:Date = new Date();
  constructor(data?:Partial<ResourceChange<ModelT>>) {
    Object.assign(this, data);
  }

  public abstract check(configModel:ModelT, dbModel:ModelT): ResourceChange<ModelT>;
  public update(model:ModelT): ModelT {
    return Object.assign(model, {
      lastModifiedAt:new Date()
    });
  }
}
