import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-incidentes',
  templateUrl: './gestion-incidentes.component.html',
  styleUrl: './gestion-incidentes.component.css'
})
export class GestionIncidentesComponent {
  isNotFound:boolean=false;
  dataSource:any[]
  dataSource2:any[]
  displayedColumns: string[] = ['id', 'id_type','complete_name'];
  displayedColumns2: string[] = ['email', 'phone_number'];

  constructor(){
    this.dataSource = [{
      id:"1212551515",
      id_type:"Cedula Ciudadania",
      complete_name:"Alan Brito Gonzalez"
    }]

    this.dataSource2 = [{
      email:"prueba@prueba.co",
      phone_number:"3133096521",
    }]
  }
  
}
