import { ConfigModel } from 'interfaces';

export class Aggregate<T extends ConfigModel> {
  public constructor(public model:T, public events:Array<AggregateEvent<T>>) { }

  public runEvents() {
    this.events.forEach((event) => this.runEvent(event));
  }

  public runEvent(event:AggregateEvent<T>) {
    event.action(this.model);
  }
}

export abstract class AggregateEvent<T extends ConfigModel> {
  public constructor(public action:(model:T) => T) { }
}
