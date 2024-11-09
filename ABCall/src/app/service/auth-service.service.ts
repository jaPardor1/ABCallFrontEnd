import { Injectable } from "@angular/core";
//import { Auth  } from 'aws-amplify';

import { jwtDecode } from "jwt-decode";
import { signIn, signOut } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedToken: any | null;
  private userRole: any | null;
  constructor(private router:Router){

  }
  public GetEmailAddress(): string | undefined {
    if (this.decodedToken === undefined || this.decodedToken === null)
      return undefined;
    return this.decodedToken.email;
  }
  
  public getUserRole(): string | null {
    return this.userRole;
  }
  public getUserHomeByUserRole(){
      
    if(this.userRole==="Superadmin" || this.userRole==="Admin"){
       this.router.navigateByUrl('listUsers');
    }
    else if(this.userRole==="Regular"){
       this.router.navigateByUrl('listIncidences');
    }
    else if(this.userRole==="Agent"|| this.userRole==="Client"){
       this.router.navigateByUrl('articlesList');
    }else{
       this.router.navigateByUrl('login');
    }

}

  public async login2(user: string, pass: string) {
    const SignInresult = await signIn({
      username: user,
      password: pass,
    });

    const { isSignedIn } = SignInresult;

    if (isSignedIn) {
      const session = await fetchAuthSession();

      try {
        if (session.tokens) {
          let idToken = session.tokens.idToken;
          localStorage.setItem('id_token', String(idToken));
          let decoded = jwtDecode(String(idToken));
          this.decodedToken = decoded;
          this.userRole = this.decodedToken['custom:custom:userRole'];

        }
      }
      catch (error) {
        console.log(error);
      }
    }
    return SignInresult;
  }


  getExpiryTime() {

    let decToken: any | null;
    if (localStorage.getItem('id_token')) {
      decToken = jwtDecode(String(localStorage.getItem('id_token')));
    }
    return decToken ? decToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    console.log('expiryTime :' + expiryTime);
    if (expiryTime) {
      var d = new Date(expiryTime * 1000); // The 0 there is the key, which sets the date to the epoch
      return (d.getTime() - (new Date()).getTime()) < 5000;
    } else {
      return true;
    }
  }

  public async onSignOut() {
    localStorage.removeItem('id_token');
    this.decodedToken = null;
    const signOutResult = await signOut();
    return signOutResult;
  }
}
