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
  apiGetUserinfo:string = environment.apiGetUserinfo;
  constructor(private http:HttpClient) { }

  public getUsers():Observable<UserDto[]>{


    return this.http.get<UserDto[]>(this.urlApi)
  }

  public getUserClientInfo(idNumber:string):Observable<UserDto[]>{
    return this.http.get<UserDto[]>(this.apiGetUserinfo+idNumber)
  }

  public getUserSub(sub:string | null){
    let url = environment.apiGetUsersSub+`${sub}`

    return this.http.get<UserDto>(url);
  }

  public editUserSub(userInfo:any){

    const body = userInfo;
    const sub = userInfo.cognito_user_sub;
    let url = environment.apiGetUsersSub+`${sub}`
    return this.http.put<any>(url,body);

  }

  public deleteUserSub(sub:string){

    let url = environment.apiGetUsersSub+`${sub}`
    return this.http.delete<any>(url);

  }

  public createUser(userInfo:any){

    const body = userInfo;
    let url = environment.apiGetUsersSub
    return this.http.post<any>(url,body);
  }




}
