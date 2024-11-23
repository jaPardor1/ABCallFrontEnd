export interface PqrResultDto {
  id: number;
  client_id:number;
  subject:string;
  description:string;
  status:string;
  date:Date;
  estimated_close_date:Date;
  user_sub: string;
  type:string ,
  communication_type:string
  ticket_number:string,
  agent_assigned:string,
  channel:string
}
