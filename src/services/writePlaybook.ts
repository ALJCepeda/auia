import * as rimraf from 'rimraf';
import * as fs from 'fs';
import { AnsiblePlaybook } from '../interfaces/AnsiblePlaybook';

const writeYAML = require('write-yaml');

export async function writePlaybook(playbook:AnsiblePlaybook) {
  console.debug('Writing Ansible playbooks');
  
  await new Promise((resolve, reject) => rimraf('ansible', (err) => {
    if(err) reject(err);
    resolve();
  }));
  
  await new Promise((resolve, reject) => fs.mkdir('ansible', (err) => {
    if(err) reject(err);
    resolve();
  }));
  
  await new Promise((resolve, reject) => writeYAML('ansible/users.yaml', playbook.users, (err:any) => {
    if(err) reject(err);
    resolve();
  }));
  
  console.debug('Finished writing Ansible playbooks');
}
