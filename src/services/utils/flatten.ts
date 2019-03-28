export function flatten(arr:any[]) {
  return arr.reduce((result, item) => [ ...result, ...item ], []);
}
