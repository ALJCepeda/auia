import * as fs from 'fs';
import * as rimraf from 'rimraf';
import { AnsiblePlaybook } from '../interfaces/AnsiblePlaybook';

const writeYAML = require('write-yaml');

export async function writePlaybook(playbook:AnsiblePlaybook) {
  await remakeDirectory('ansible');
  await writePlaybooks('ansible', playbook);
}

async function writePlaybooks(dir:string, playbook:AnsiblePlaybook) {
  console.debug('Writing ansible playbooks');
  await new Promise((resolve, reject) => writeYAML(`${dir}/users.yaml`, playbook.users, (err:any) => {
    if(err) { reject(err); }
    resolve();
  }));
  console.debug('Finished writing Ansible playbooks');
}

async function remakeDirectory(dir:string) {
  console.debug(`Deleting ${dir} folder`);
  await new Promise((resolve, reject) => rimraf(dir, (err) => {
    if(err) { reject(err); }
    resolve();
  }));

  console.debug(`Making ${dir} folder`);
  await new Promise((resolve, reject) => fs.mkdir(dir, (err) => {
    if(err) { reject(err); }
    resolve();
  }));
}
