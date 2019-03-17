import { Group, GroupMembership, Repository, RepositoryInstance, User } from 'models';
import 'reflect-metadata';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  database: `${__dirname}/../.auia/auia.db`,
  entities: [ User, Group, GroupMembership, Repository, RepositoryInstance ],
  logging: true,
  synchronize: true,
  type: 'sqlite'
};

export interface AppConfig {
  dbConnection: Connection;
}

export async function configure(): Promise<AppConfig> {
  const dbConnection = await createConnection(connectionOptions);

  return { dbConnection };
}
