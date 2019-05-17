export interface ResourceSchema {
  type:string,
  items: {
    type:string,
    definition:string,
    required: string[],
    properties: {
      [key:string]: { [key:string]:any }
    }
  }
}
