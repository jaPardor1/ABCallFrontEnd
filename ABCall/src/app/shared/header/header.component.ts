import { Component } from '@angular/core';
import { HeaderOptionDTO } from './headerOption';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../service/i18n/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public moduleName: string = $localize `BIENVENIDO`
  public options: HeaderOptionDTO[];
  public currentOption=3;
  public userRole: string='';
  constructor(private authService:AuthService,private router: Router) {
    this.userRole = authService.getUserRole()??'';
    this.options = [
      {
        id: 1,
        name: $localize `RADICAR PQR`,
        isActive: false,
        link:"createIncidence",
        allowedRoles:['Regular','Admin','Superadmin','Admin']
      },
      {
        id: 2,
        name: $localize `CONSULTAR PQR`,
        isActive: false,
        link:"listIncidences",
        allowedRoles:['Regular','Admin','Superadmin']
      },
      {
        id: 3,
        name: $localize `USUARIOS REGISTRADOS`,
        isActive: true,
        link:"listUsers",
        allowedRoles:['Admin','Superadmin']
      },
      {
        id: 4,
        name: $localize `BASE DE CONOCIMIENTOS`,
        isActive: false,
        link:"articlesList",
        allowedRoles:['Regular','Admin','Superadmin','Agent']
      }
    ]
  }

  setModuleName(name:string,id:number){
    this.moduleName = name;
    this.setActiveOption(id);

  }
  setActiveOption(cOption:number){

    //desactivar opcion anterior
    let searched_obj: HeaderOptionDTO | undefined = this.options.find(i=>i.id==this.currentOption);
    if(searched_obj!==undefined) searched_obj.isActive = false;
    // activar opcion seleccionada
    searched_obj = this.options.find(i=>i.id==cOption);
    if(searched_obj!==undefined) searched_obj.isActive = true;
    this.currentOption=cOption;
  }

  async onLogOut(){
     await this.authService.onSignOut();
     debugger;
     this.router.navigateByUrl('login');
  }

  changeLanguage(lang: string) {
    this.translationService.changeLanguage(lang);
  }

}
