import { Component, OnInit } from '@angular/core';
import { UserDto } from '../user';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css'
})
export class ListadoUsuariosComponent  {
  displayedColumns: string[] = ['identificacion', 'nombre', 'perfil','actions'];
  usersList:UserDto[];

  constructor() {

    this.usersList = [
      {
        identificacion:'5632584',
        nombre:'Juan Perez',
        perfil:'Gestor'

      },
      {
        identificacion:'155151501',
        nombre:'Clara perez',
        perfil:'Gestor'

      },
      {
        identificacion:'1032465885',
        nombre:'Jhon smith',
        perfil:'Administrador'

      }
    ]
  }


}
