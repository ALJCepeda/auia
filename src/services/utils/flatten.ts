export function flatten<T>(arr:T[][]): T[] {
  return arr.reduce((result, item) => [ ...result, ...item ], []);
}
