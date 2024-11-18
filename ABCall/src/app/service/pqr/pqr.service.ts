import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PqrResultDto } from '../../pqr/pqrResult';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PqrService {

   urlApi = environment.apiPqrs;
  constructor(private http:HttpClient) { }
  public createIncident(incident:any):Observable<any>
  {
    return this.http.post<any>(this.urlApi,incident)
  }

  public getIncidents():Observable<PqrResultDto[]>{
    let op = '/assigned'
    const url = this.urlApi+op
    return this.http.get<PqrResultDto[]>(url)
  }

  public getIncidentsSub(userSub:string):Observable<PqrResultDto[]>{
    let sub = "?user_sub="+userSub;
    const url = this.urlApi+sub
    return this.http.get<PqrResultDto[]>(url)
  }
}
