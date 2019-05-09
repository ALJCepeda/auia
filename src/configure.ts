import 'reflect-metadata';
import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import { ResourceChange } from './entities/ResourceChange';
import { Resources } from './services/dictionaries/ResourceDict';

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
  configFile: string;
}

export async function configure(): Promise<AppConfig> {
  const dbConnection = await createConnection(connectionOptions);
  const configFile = process.argv[2];
  
  if(!configFile) {
    throw new Error('Must include a config file');
  }
  
  console.debug('App Configured');
  return { dbConnection, configFile };
}
