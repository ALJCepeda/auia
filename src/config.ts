import 'reflect-metadata';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import * as entities from 'models/entities';

const connectionOptions: ConnectionOptions = {
  database: `${__dirname}/../.auia/auia.db`,
  entities: Object.values(entities),
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
