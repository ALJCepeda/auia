import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ResourceChangePayload } from '../interfaces/ResourceChangePayload';
import { Resource } from './Resource';

export interface ResourceChangeCTR<ModelT extends Resource = Resource> {
  type:string;
  new (data?:ResourceChangePayload): ResourceChange<ModelT>;
}

@Entity('entity-changes')
export abstract class ResourceChange<ModelT extends Resource = Resource> implements ResourceChangePayload {
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
  constructor(data?:ResourceChangePayload) {
    if(data) {
      this.id = data.id;
      this.target = data.target;
      this.payload = data.payload;
      this.createdAt = data.createdAt;
    }
  }

  public abstract check(configModel:ModelT, dbModel:ModelT): ResourceChange<ModelT>;
  public update(model:ModelT): ModelT {
    return Object.assign(model, {
      lastModifiedAt:new Date()
    });
  }
}
