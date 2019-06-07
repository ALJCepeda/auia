import { Column, Entity, OneToMany } from 'typeorm';
import { ResourceSchema } from '../../interfaces/ResourceSchema';
import { Spec } from '../../models/Test';
import { Resource, ResourceSchemaModel } from '../Resource';
import { GroupUser } from '../GroupUser/GroupUser';
import { User } from '../User/User';

@Entity('group')
export class Group extends Resource {
  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public users?:GroupUser[];

  @Column()
  public isSudo:boolean = false;

  public getSpecs():Array<Spec<Resource>> {
    return [];
  }
  
  public data?:GroupSchemaModel;
  
  static schemaKey = 'groups';
  static getSchema():ResourceSchema {
    const superSchema = super.getSchema();
    return {
      type:'array',
      items: {
        type: 'object',
        definition: 'Defines the groups on the system',
        required: [
          ...superSchema.items.required
        ],
        properties: {
          ...superSchema.items.properties,
          users: {
            type: 'array',
            definition: `Name identifiers of users defined in root { key:${User.schemaKey} }`,
            items: [{ type:'string' }]
          },
          sudo: {
            type: 'boolean',
            definition: `Determines if group has sudo privileges`
          }
        }
      }
    };
  }
}

export interface GroupSchemaModel extends ResourceSchemaModel {
  users:string[];
  sudo:boolean;
}
