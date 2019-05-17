import { Column, Entity, OneToMany } from 'typeorm';
import { ResourceSchema } from '../../interfaces/ResourceSchema';
import { Spec, Test } from '../../models/Test';
import { Resource, ResourceSchemaModel } from '../Resource';
import { UserRepository } from '../UserRepository/UserRepository';

@Entity('repositories')
export class Repository extends Resource {
  @Column()
  public brand:string = 'git';
  
  @Column()
  public branch:string = 'master';
  
  @Column()
  public url:string = '';

  @OneToMany(() => UserRepository, (repositoryInstance) => repositoryInstance.id)
  public repositoryInstances?:UserRepository[];
  
  public getSpecs():Array<Spec<Resource>> {
    return [
      new Test(() => this.name.length >= 1, 'Repository needs a name in order to be registered')
    ];
  }
  
  public static schemaKey:string = 'repositories';
  public static getSchema():ResourceSchema {
    const superSchema = super.getSchema();
    return {
      type:'array',
      items: {
        type: 'object',
        definition: 'Defines the users on the system',
        required: [
          ...superSchema.items.required,
          'url',
        ],
        properties: {
          ...superSchema.items.properties,
          brand: {
            type: 'string',
            definition: 'Version control system of repository',
            defaults:'git',
            enum: [ 'git' ]
          },
          branch: {
            type: 'string',
            definition: 'Default branch for repository instances'
          },
          url: {
            type: 'string',
            definition: 'Remote URL to clone repository from'
          }
        }
      }
    };
  }
}

export interface RepositorySchemaModel extends ResourceSchemaModel {
  brand:string;
  branch?:string;
  url:string;
}
