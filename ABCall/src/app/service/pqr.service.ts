import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PqrService {

  private urlApi ='https://g8j111rki2.execute-api.us-east-1.amazonaws.com/prod/incidents'
  constructor(private http:HttpClient) { }
  public createIncident(incident:any):Observable<any>
  {
    return this.http.post<any>(this.urlApi,incident)
  }
}
