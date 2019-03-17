export function assign<T>(instance:T, data:Partial<T>): T {
  for(const key in instance) {
    if(instance.hasOwnProperty(key) && data.hasOwnProperty(key) && typeof data[key] !== undefined) {
      // @ts-ignore
      instance[key] = data[key];
    }
  }

  return instance;
}
