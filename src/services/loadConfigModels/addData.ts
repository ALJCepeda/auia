import { Resource } from '../../entities/Resource';
import { Registry } from '../../models/Registry';
import { HandlerDict } from '../dictionaries/HandlerDict';

export function addData(key:string, data:{ [key:string]: Resource[] }, configRegistry:Registry):void {
  const handler = HandlerDict.get(key);
  if(!handler) {
    throw new Error(`No handler found for root key: ${key}`);
  }
  
  const result = handler.create(data[key]);
  configRegistry.add(result);
}
