import 'reflect-metadata';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import * as entities from 'entities';

const connectionOptions: ConnectionOptions = {
  database: `${__dirname}/../.auia/auia.db`,
  entities: Object.values(entities),
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
