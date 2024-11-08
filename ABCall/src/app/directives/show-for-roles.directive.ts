import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Profile } from '../users/perfil';
import { AuthService } from '../service/auth-service.service';

@Directive({
  selector: '[appShowForRoles]'
})
export class ShowForRolesDirective implements  OnInit {

  
  @Input('appShowForRoles') allowedRoles?:any
  
  constructor(private authService: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { 

  }

  ngOnInit(): void {
      let currentUserRole= this.authService.getUserRole();
      if(this.allowedRoles?.includes(currentUserRole)){
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }else{
        this.viewContainerRef.clear();
      }
  }
}
