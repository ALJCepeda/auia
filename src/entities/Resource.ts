import { Check, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ResourceSchema } from '../interfaces/ResourceSchema';
import { Validatable } from '../interfaces/Validatable';
import { Spec } from '../models/Test';

export interface ResourceCTR<ResourceT extends Resource = Resource> {
  new():ResourceT;
  type:string;
  schemaKey:string;
}

export interface ResourceAssociationCTR <
  ResourceMaster extends Resource = Resource,
  ResourceSlave extends Resource = Resource,
  ResourceRelation extends Resource = Resource
> extends ResourceCTR<ResourceMaster> {
  associate(master:ResourceMaster, slave:ResourceSlave):ResourceRelation;
}

@Unique(['name'])
@Check('name <> ""')
@Check('id <> -1')
export class Resource implements Validatable<Resource> {
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
  
  @Column()
  public active:boolean = true;
  
  public data?:any;
  
  public getSpecs(): Array<Spec<Resource>> {
    return []
  }
  
  static schemaKey:string = 'resources';
  static getSchema():ResourceSchema {
    return {
      type:'array',
      items: {
        type: 'object',
        definition: 'Base properties shared by all Resources',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            definition: `Name of the ${this.type}`
          },
          active: {
            type: 'boolean',
            definition: `Is this ${this.type} active?`
          }
        }
      }
    };
  }
}

export interface ResourceSchemaModel {
  name:string;
  active:boolean;
}
