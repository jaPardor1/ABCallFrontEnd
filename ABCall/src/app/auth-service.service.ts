import { Injectable } from "@angular/core";
//import { Auth  } from 'aws-amplify';

import { jwtDecode } from "jwt-decode";
import { signIn, signOut } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private decodedToken: any| null;

  public GetEmailAddress() : string | undefined
  {
    if(this.decodedToken === undefined || this.decodedToken ===null)
     return undefined;
    return  this.decodedToken.email;
  }


  public async login2(user:string, pass:string)
  {
    const  SignInresult = await signIn({
      username:user,
      password:pass,
    });

    const { isSignedIn} =SignInresult;

    if(isSignedIn){
      const session = await fetchAuthSession();

    try
    {
      if(session.tokens){
        let idToken = session.tokens.idToken;
        localStorage.setItem('id_token', String(idToken));
        let decoded = jwtDecode(String(idToken));
        this.decodedToken=decoded;

      }
    }
    catch(error)
    {
        console.log(error);
    }


    }



    return SignInresult;
  }

  // public async onSignUp(username: string, password: string, email: string, phone_number:string )
  // {
  //   const { user } = await Auth.signUp({
  //       username,
  //         password,
  //         attributes: {
  //             email,        // optional
  //             phone_number,   // optional - E.164 number convention
  //             // other custom attributes
  //         }
  //     });
  //     return user;
  // }

  // public async onConfirmSignUp(userName:string, code: string)
  // {
  //     return  await Auth.confirmSignUp(userName, code);
  // }

  getExpiryTime() {

    let decToken:any |null;
    if(localStorage.getItem('id_token')){
      decToken=jwtDecode(String(localStorage.getItem('id_token')));
    }
    return decToken ? decToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    console.log('expiryTime :' +expiryTime);
    if (expiryTime) {
        var d = new Date(expiryTime*1000); // The 0 there is the key, which sets the date to the epoch
      return (d.getTime() - (new Date()).getTime()) < 5000;
    } else {
      return true;
    }
  }

  public async onSignOut()
  {
    localStorage.removeItem('id_token');
    this.decodedToken=null;
    const signOutResult =await signOut();
    return signOutResult;
  }
}
