import { Component } from '@angular/core';
import { HeaderOptionDTO } from './headerOption';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public moduleName: string = 'BIENVENIDO'
  public options: HeaderOptionDTO[];
  public currentOption=3;
  constructor() {

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
}
