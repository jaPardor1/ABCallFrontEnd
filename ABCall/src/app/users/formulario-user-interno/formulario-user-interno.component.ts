import { Component } from '@angular/core';
import { ProfileDTO } from '../profile';
import { DocumentidDTO } from '../documentId';
import { SubscriptionDTO } from '../subscription';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario-user-interno',
  templateUrl: './formulario-user-interno.component.html',
  styleUrl: './formulario-user-interno.component.css'
})
export class FormularioUserInternoComponent {


  public form:FormGroup
  public profiles:ProfileDTO[];
  public documentIds:DocumentidDTO[];
  public subscriptionsPlan:SubscriptionDTO[];
  constructor(private formBuilder:FormBuilder){
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
    this.form = this.formBuilder.group(
      {
          perfil:['',{
            validators:[Validators.required]
          }],
          plan:[],
          tipoIdentificacion:['',{
            validators:[Validators.required]
          }],
          identificacion:['',{
            validators:[Validators.required]
          }],
          nombres:['',{
            validators:[]
          }],
          apellidos:['',{
            validators:[]
          }],
          razonSocialEmpresa:[],
          direccionEmpresa:[],
          tipoIdentificacionRepLegal:[],
          identificacionRepLegal:[],
          nombresRepLegal:[],
          apellidosRepLegal:[],
          correoElectronico:['',{
            validators:[Validators.required]
          }],
          telefono:['',{
            validators:[Validators.required]
          }],
          password:['',{
            validators:[Validators.required]
          }],
          password2:['',{
            validators:[Validators.required]
          }]

      }
    );
  }

  saveInfo(){
  }

// get errors

getErrorProfileField(){
  var campo = this.form.get('perfil');
  if (campo!= null){

    if(campo.hasError('required')){
      return 'Por favor especifique un perfil';
    }
  }
  return '';
}
getErrorIdentificationTypeField(){
  var campo = this.form.get('tipoIdentificacion');
  if (campo!= null){

    if(campo.hasError('required')){
      return 'Por favor especifique un tipo de identificación';
    }
  }
  return '';
}
getErrorEmailField(){
  var campo = this.form.get('correoElectronico');
  if (campo!= null){

    if(campo.hasError('required')){
      return 'Por favor especifique un correo electrónico';
    }
  }
  return '';
}

getErrorTelephoneField(){
  var campo = this.form.get('telefono');
  if (campo!= null){

    if(campo.hasError('required')){
      return 'Por favor especifique un teléfono';
    }
  }
  return '';
}

getErrorPasswordField(){
  var campo = this.form.get('password');
  if (campo!= null){

    if(campo.hasError('required')){
      return 'Por favor especifique una contraseña';
    }
  }
  return '';
}





}
