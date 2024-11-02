import { Component } from '@angular/core';
import { HeaderOptionDTO } from './headerOption';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public moduleName: string = 'BIENVENIDO'
  public options: HeaderOptionDTO[];
  public currentOption=3;
  constructor(private authService:AuthService,private router: Router) {

    this.options = [
      {
        id: 1,
        name: 'RADICAR PQR',
        isActive: false,
        link:"createIncidence"
      },
      {
        id: 2,
        name: 'CONSULTAR PQR',
        isActive: false,
        link:"listIncidences"
      },
      {
        id: 3,
        name: 'USUARIOS REGISTRADOS',
        isActive: true,
        link:"listUsers"
      },
      {
        id: 4,
        name: 'BASE DE CONOCIMIENTOS',
        isActive: false,
        link:"articlesList"
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
}
