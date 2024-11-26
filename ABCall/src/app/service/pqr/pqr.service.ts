
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PqrResultDto } from '../../pqr/pqrResult';
import { PqrDTO } from '../../pqr/Pqr';
import { PqrRiskEvaluationDto } from '../../pqr/PqrRiskEvaluation';
import { environment } from '../../../environments/environment';
import { PqrStatsDto } from '../../pqr/PqrStatsDto'; // Importar el nuevo modelo de estadísticas

@Injectable({
  providedIn: 'root'
})
export class PqrService {

  urlApi = environment.apiPqrs;
  urlRiskEval = environment.apiriskEvaluationBase;
  urlStats = environment.apiPqrStats;

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
  public getIncidentRiskEvaluation(idPqr:number):Observable<PqrRiskEvaluationDto>{
    let url = this.urlRiskEval+idPqr
    return this.http.get<PqrRiskEvaluationDto>(url)
  }

  // Nueva función para obtener estadísticas de PQRs
  public getPqrStats(): Observable<PqrStatsDto> {
    return this.http.get<PqrStatsDto>(this.urlStats);

  }

  public assignIncidence(idPqr:number,incident:any){
    let url = this.urlApi+'/'+idPqr+'/assign';
    return this.http.post<any>(url,incident);
  }

  public closeIncident(idPqr:number,status:any){
    let url = this.urlApi+'/'+idPqr;
    return this.http.put<any>(url,status);
  }

  public getReport(filters:any){
    let url = this.urlApi+'/stats/report'
    return this.http.post<any>(url,filters);
  }
}




