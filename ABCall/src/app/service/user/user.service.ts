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

  public getUserSub(sub:string | null){
    let url = environment.apiGetUsersSub+`${sub}`
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    return this.http.get<UserDto>(url,{headers});
  }

  public editUserSub(userInfo:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    const body = userInfo;
    const sub = userInfo.cognito_user_sub;
    let url = environment.apiGetUsersSub+`${sub}`
    return this.http.put<any>(url,body,{headers});

  }

  public deleteUserSub(sub:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    let url = environment.apiGetUsersSub+`${sub}`
    return this.http.delete<any>(url,{headers});

  }

  public createUser(userInfo:any){
    debugger;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
    const body = userInfo;
    let url = environment.apiGetUsersSub
    return this.http.post<any>(url,body,{headers});

  }


}
