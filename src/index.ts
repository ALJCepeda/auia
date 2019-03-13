import * as AJV from 'ajv';
import { Group, GroupMembership, Repository, RepositoryInstance, User } from 'models';
import 'reflect-metadata';
import { parseConfig } from 'services';
import { ConnectionOptions, createConnection } from 'typeorm';
import { loadConfig, loadSchema } from './utils';

const options: ConnectionOptions = {
  database: `${__dirname}/../.auia/auia.db`,
  entities: [ User, Group, GroupMembership, Repository, RepositoryInstance ],
  logging: true,
  synchronize: true,
  type: 'sqlite'
};

createConnection(options).then((connection) => {
  const userRepository = connection.getRepository(User);
  console.log('Got it!');
});

/*
const config = loadConfig();
const schema = loadSchema();

const ajv = new AJV();
const validate = ajv.compile(schema);

if (!validate(config)) {
  throw validate.errors;
}

const configuration = parseConfig(config);

console.log(configuration.users.get('alfred'));*/
