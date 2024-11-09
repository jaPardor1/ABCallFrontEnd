import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./service/auth-service.service";

@Injectable({providedIn:'root'})
export class AuthorizeGuard implements CanActivate{
    constructor(private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router)
    {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(!this.authService.isTokenExpired()){
        debugger;
        const allowedRoles = route.data?.['allowedRoles'];
        let currentRole=this.authService.getUserRole();
        if(!allowedRoles.includes(currentRole)){
            console.log("Access restricted");
            this.authService.getUserHomeByUserRole();
        }
         return true;
      }else{
        return  this.router.navigate(['/login']);
      }
        
    }
}
