import { Component } from '@angular/core';
import { ProfileDTO } from '../profile';
import { DocumentidDTO } from '../documentId';
import { SubscriptionDTO } from '../subscription';


@Component({
  selector: 'app-formulario-user-interno',
  templateUrl: './formulario-user-interno.component.html',
  styleUrl: './formulario-user-interno.component.css'
})
export class FormularioUserInternoComponent {



  public profiles:ProfileDTO[];
  public documentIds:DocumentidDTO[];
  public subscriptionsPlan:SubscriptionDTO[];
  constructor(){
    this.profiles = [
      {  id:1,
         profileName:"Gestor"
      },
      {  id:2,
         profileName:"Administrador"
      },
      {  id:3,
         profileName:"Empresa"
      }
    ]

    this.documentIds = [
      {
        id:1,
        documentName:'CEDULA DE CIUDADANIA'
      },
      {
        id:2,
        documentName:'NIT'
      },
      {
        id:3,
        documentName:'CEDULA EXTRANJERIA'
      }
    ]

    this.subscriptionsPlan=[
        {id:1,subscrptionName:'Emprendedor'},
        {id:2,subscrptionName:'Empresario'},
        {id:3,subscrptionName:'Empresario +'}
    ]
  }
}
