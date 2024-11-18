import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlowResultDto } from '../../flow/flowResult';
import { environment } from '../../../environments/environment';
import { TagResultDTO } from '../../knwoledgebase/tagResult';
import { FlowStepResultDTO } from '../../flow/steps/stepRestult';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

   urlApi = environment.apiFlows;
  constructor(private http:HttpClient) { }
  public createFlow(flow:any):Observable<any>
  {
    return this.http.post<any>(this.urlApi,flow)
  }

  public getFlows():Observable<FlowResultDto[]>{
    let op = 's'
    const url = this.urlApi+op
    return this.http.get<FlowResultDto[]>(url)
  }

  public deleteFlow(id:number){
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    let url = this.urlApi+`/${id}`
    return this.http.delete<any>(url);

  }

  public getTags():Observable<TagResultDTO[]>{
    let url = environment.apiTags;
    return this.http.get<TagResultDTO[]>(url)
  }

  public getSteps(flow_id:number):Observable<FlowStepResultDTO[]>{
    let url = this.urlApi + `/steps/${flow_id}`;
    return this.http.get<FlowStepResultDTO[]>(url);
  }

  public createStep(step:any){
    let url = this.urlApi + "/step";
    return this.http.post<any>(url, step)
  }

  public deleteStep(id: number){
    let url = this.urlApi + "/step/" + id;
    return this.http.delete<any>(url);
  }

}
