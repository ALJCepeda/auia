import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Resource } from '../Resource';

export interface ResourceChangeCTR<ModelT extends Resource = Resource> {
  new (): ResourceChange<ModelT>;
  type:string;
}

export interface DBResourceChange {
  id?:number;
  name:string;
  type:string;
  target:string;
  payload:string;
  createdAt:Date;
}

@Entity('entity-changes')
export abstract class ResourceChange<ModelT extends Resource> {
  public static get type():string {
    return Resource.type;
  }
  
  @Column()
  public get type():string {
    return Resource.type;
  };
  
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

  public abstract check(configModel?:ModelT, entityModel?: ModelT): Promise<ResourceChange<ModelT>>;
  public abstract update(model:ModelT, change:DBResourceChange): ModelT;
}
