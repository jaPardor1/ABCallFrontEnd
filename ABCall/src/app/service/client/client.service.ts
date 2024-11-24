import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ClientResultDTO } from '../../client/clientResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {urlAPI: string=environment.apiClients;

  constructor(private http:HttpClient) { }
  
  public getClients():Observable<ClientResultDTO[]>{
    let op = 's';
    const url = this.urlAPI+op;
    return this.http.get<ClientResultDTO[]>(url);
  }
  
  public createClient(client:any):Observable<any>{
    return this.http.post<any>(this.urlAPI, client)
  }

}
