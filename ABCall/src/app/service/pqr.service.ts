import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PqrResultDto } from '../pqr/pqrResult';

@Injectable({
  providedIn: 'root'
})
export class PqrService {

  private urlApi ='https://g8j111rki2.execute-api.us-east-1.amazonaws.com/prod/incidents'
  private urlApi2 ='https://g8j111rki2.execute-api.us-east-1.amazonaws.com/prod/incidents'
  constructor(private http:HttpClient) { }
  public createIncident(incident:any):Observable<any>
  {
    return this.http.post<any>(this.urlApi,incident)
  }

  public getIncidents():Observable<PqrResultDto[]>{
    return this.http.get<PqrResultDto[]>(this.urlApi2)
  }
}
