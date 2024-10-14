export interface PqrResultDto {
  client_id:            string;
  subject:              string;
  description:          string;
  status:               string;
  date:                 Date;
  estimated_close_date: Date;
  user_id:              string;
  type:                 string;
}
