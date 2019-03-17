import { EntityModel } from 'models';

export class Aggregate<T extends EntityModel> {
  public constructor(public model:T, public events:Array<AggregateEvent<T>>) { }

  public runEvents() {
    this.events.forEach((event) => this.runEvent(event));
  }

  public runEvent(event:AggregateEvent<T>) {
    event.action(this.model);
  }
}

export abstract class AggregateEvent<T extends EntityModel> {
  public constructor(public action:(model:T) => T) { }
}
