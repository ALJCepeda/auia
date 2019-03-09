import { User } from 'models';
import { AggregateEvent } from './Base';

export class CreateUser extends AggregateEvent<User> {
  constructor(public id:string) {
    super((model:User) => {
      model.id = this.id;
      return model;
    });
  }
}