import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleResultDto } from '../../knwoledgebase/articleResult';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

   urlApi = environment.apiFilterArticles;
  constructor(private http:HttpClient) { }

  public filterArticles(content:string):Observable<ArticleResultDto[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    const body = {content: content}
    return this.http.post<ArticleResultDto[]>(this.urlApi, body, {headers})
  }
}
