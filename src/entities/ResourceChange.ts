import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Resource } from './Resource';

export interface ResourceChangeCTR<ModelT extends Resource = Resource> {
  new (data?:Partial<ResourceChange<ModelT>>): ResourceChange<ModelT>;
  type:string;
}

@Entity('entity-changes')
export abstract class ResourceChange<ModelT extends Resource = Resource> {
  constructor(data?:Partial<ResourceChange<ModelT>>) {
    Object.assign(this, data);
  }

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

  public get hasPayload(): boolean {
    return this.payload !== '';
  }

  public abstract check(configModel:ModelT, dbModel:ModelT): ResourceChange<ModelT>;
  public update(model:ModelT): ModelT {
    return Object.assign(model, {
      lastModifiedAt:new Date()
    });
  }
}
