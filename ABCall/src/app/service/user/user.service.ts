import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../users/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApi:string=environment.apiGetUsersForClient;

  constructor(private http:HttpClient) { }

  public getUsers():Observable<UserDto[]>{

    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    return this.http.get<UserDto[]>(this.urlApi,{headers})
  }

  public  getUserSub(sub:string | null){
    let url = environment.apiGetUsersSub+`${sub}`
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    return this.http.get<UserDto>(url,{headers});

  }
}
