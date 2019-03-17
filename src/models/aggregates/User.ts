import { Entity } from 'typeorm';
import { User } from '../records';
import { ChangeStore } from './ChangeStore';

@Entity('user-changes')
export class UserAggregate extends ChangeStore<User> {

}
