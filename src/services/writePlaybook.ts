import * as rimraf from 'rimraf';
import * as fs from 'fs';
import { AnsiblePlaybook } from '../interfaces/AnsiblePlaybook';

const writeYAML = require('write-yaml');

export async function writePlaybook(playbook:AnsiblePlaybook) {
  console.debug('Writing Ansible playbooks');
  
  await remakeDirectory('ansible');
  await writePlaybooks('ansible', playbook);
  
  console.debug('Finished writing Ansible playbooks');
}

async function writePlaybooks(dir:string, playbook:AnsiblePlaybook) {
  await new Promise((resolve, reject) => writeYAML(`${dir}/users.yaml`, playbook.users, (err:any) => {
    if(err) reject(err);
    resolve();
  }));
}

async function remakeDirectory(dir:string) {
  console.debug(`Deleting ${dir}`);
  await new Promise((resolve, reject) => rimraf(dir, (err) => {
    if(err) reject(err);
    resolve();
  }));
 
  console.debug(`Making ${dir}`);
  await new Promise((resolve, reject) => fs.mkdir(dir, (err) => {
    if(err) reject(err);
    resolve();
  }));
}
