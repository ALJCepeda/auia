import { Configuration } from 'models';

export function runAggregateeActions(config:Configuration) {
  config.users.forEach((model) => {
    const user = UserRepository.findOrCreate(model);
    if(user) {

    }
  });
}
