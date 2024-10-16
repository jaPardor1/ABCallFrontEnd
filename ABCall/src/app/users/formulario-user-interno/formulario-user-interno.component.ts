import { Component } from '@angular/core';
import { ProfileDTO } from '../profile';


@Component({
  selector: 'app-formulario-user-interno',
  templateUrl: './formulario-user-interno.component.html',
  styleUrl: './formulario-user-interno.component.css'
})
export class FormularioUserInternoComponent {



  public profiles:ProfileDTO[];
  constructor(){
    this.profiles = [
      {id:1,profileName:"Gestor"}
    ]
  }
}
