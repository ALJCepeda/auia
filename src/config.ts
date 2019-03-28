import 'reflect-metadata';
import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import { ResourceChange } from './entities/changes/ResourceChange';
import { Resources } from './entities/ResourceDict';

const connectionOptions: ConnectionOptions = {
  database: `${__dirname}/../.auia/auia.db`,
  entities: [ ...Resources, ResourceChange ],
  logging: true,
  synchronize: true,
  type: 'sqlite'
};

process.on('uncaughtException', function(error) {
  console.error(error);
  process.exit(1)
});

process.on('unhandledRejection', function(error){
  console.error(error);
  process.exit(1);
});

export interface AppConfig {
  dbConnection: Connection;
}

export async function configure(): Promise<AppConfig> {
  const dbConnection = await createConnection(connectionOptions);

  console.debug('App Configured');
  return { dbConnection };
}
