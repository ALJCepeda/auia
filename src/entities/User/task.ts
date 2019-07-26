import { AnsibleTask } from '../../interfaces/AnsibleTask';
import { Registry } from '../../models/Registry';

export interface UserTask extends AnsibleTask {
  name: string;
  user: {
    name: string,
    state: string
  };
}

export function task(config: Registry): UserTask[] {
  return config.users.map((user) => {
    return {
      name: `User ${user.name}`,
      user: {
        name: user.name,
        state: user.active ? 'present' : 'absent'
      }
    };
  });
}
