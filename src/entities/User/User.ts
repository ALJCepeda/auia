import { Entity, OneToMany } from 'typeorm';
import { Spec } from '../../models/Test';
import { GroupUser } from '../GroupUser/GroupUser';

import { Resource } from '../Resource';
import { UserRepository } from '../UserRepository/UserRepository';

@Entity('users')
export class User extends Resource {
  static schemaKey = 'users';
  
  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositories?: UserRepository[];
  public repositoryMap: Map<string, UserRepository> = new Map();
  
  @OneToMany(() => GroupUser, (groupMembership) => groupMembership.id)
  public groups?: GroupUser[];
  public groupMap: Map<string, GroupUser> = new Map();
  
  public getSpecs(): Array<Spec<Resource>> {
    return [];
  }
  
  public data?:UserSchemaModel;
  
  static schema = {
    type:'array',
    items: {
      type: 'object',
      definition: 'Defines the users on the system',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          definition: 'Name of the user'
        },
        password: {
          type: 'string',
          definition: 'Initial password for user'
        },
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
          items: [{type: 'string'}]
        }
      }
    }
  };
}

export interface UserSchemaModel {
  name: string;
  active: boolean;
  password: string;
  path: string;
  repositories: string[];
  groups: string[];
}
