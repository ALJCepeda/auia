export interface ResourceChangePayload {
  id?:number;
  type:string;
  name:string;
  target:string;
  payload:string;
  createdAt:Date;
}
