import { Entity, OneToMany } from 'typeorm';
import { ResourceSchema } from '../../interfaces/ResourceSchema';
import { Spec } from '../../models/Test';
import { GroupUser } from '../GroupUser/GroupUser';

import { Resource, ResourceSchemaModel } from '../Resource';
import { UserRepository } from '../UserRepository/UserRepository';

@Entity('users')
export class User extends Resource {
  public static schemaKey = 'users';
  public static getSchema():ResourceSchema {
    const superSchema = super.getSchema();
    return {
      type:'array',
      items: {
        type: 'object',
        definition: 'Defines the users on the system',
        required: [
          ...superSchema.items.required
        ],
        properties: {
          ...superSchema.items.properties,
          path: {
            oneof: [
              {
                type: 'string',
                definition: 'File path on system',
                defaults: '~/'
              }, {$ref: '#/$defs/path'}
            ]
          },
          repositories: {
            type: 'array',
            definition: 'Name identifiers of repositories defined in root { key:repositories }',
            items: [{ type:'string' }]
          },
          groups: {
            type: 'array',
            definition: 'Name identifiers of groups defined in root { key:groups }',
            items:[{ type:'string' }]
          }
        }
      }
    };
  }
  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositories?: UserRepository[];
  public repositoryMap: Map<string, UserRepository> = new Map();

  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public groups?: GroupUser[];
  public groupMap: Map<string, GroupUser> = new Map();

  public data?:UserSchemaModel;

  public getSpecs(): Array<Spec<Resource>> {
    return [];
  }
}

export interface UserSchemaModel extends ResourceSchemaModel {
  path?: string;
  repositories?: string[];
  groups?: string[];
}
