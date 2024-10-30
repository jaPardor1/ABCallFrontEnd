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
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    return this.http.get<PqrResultDto[]>(this.urlApi,{headers})
  }
}
