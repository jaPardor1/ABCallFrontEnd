import { Component, Input, OnInit } from '@angular/core';
import { ProfileDTO } from '../profile';
import { DocumentidDTO } from '../documentId';
import { SubscriptionDTO } from '../subscription';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { validateApellidosRepLegal, validateDireccionEmpresa, validateIdentificacionRepLegal, validateLastNameField, validateNameField, validateNombresRepLegal, validatePasswordConfirmation, validatePlan, validateRazonSocial, validateTipoIdentificacionRepLegal } from '../validations/userFormValidations';
import { UserDto } from '../user';
import { Profile } from '../perfil';
import { UserService } from '../../service/user/user.service';


@Component({
  selector: 'app-formulario-user-interno',
  templateUrl: './formulario-user-interno.component.html',
  styleUrl: './formulario-user-interno.component.css'
})
export class FormularioUserInternoComponent implements OnInit {



  @Input()
  model:string | null;

  public form:FormGroup;
  public profiles =[{id:'',profileName:''}] ;
  public documentIds:DocumentidDTO[];
  public subscriptionsPlan:SubscriptionDTO[];
  constructor(private formBuilder:FormBuilder,private userService:UserService){

    this.model=null;
    this.form = this.formBuilder.group(
      {
          user_role:['',{
            validators:[Validators.required]
          }],
          plan:[],
          document_type:['',{
            validators:[Validators.required]
          }],
          id_number:['',{
            validators:[Validators.required,Validators.pattern('^[0-9]+$')]
          }],
          name:['',{
            validators:[]
          }],
          last_name:['',{
            validators:[]
          }],
          razonSocialEmpresa:[],
          direccionEmpresa:[],
          tipoIdentificacionRepLegal:[],
          identificacionRepLegal:[],
          nombresRepLegal:[],
          apellidosRepLegal:[],
          correoElectronico:['',{
            validators:[Validators.required,Validators.email]
          }],
          cellphone:['',{
            validators:[Validators.required,Validators.pattern('^[1-9]{1,10}$'),Validators.maxLength(10)]
          }],
          password:['',{
            validators:[Validators.required]
          }],
          password2:['',{
            validators:[Validators.required]
          }]

      },
      {
        validator:[validatePlan('user_role','plan'),
                   validateRazonSocial('user_role','razonSocialEmpresa'),
                   validateNameField('user_role','name'),
                   validateLastNameField('user_role','last_name'),
                   validateDireccionEmpresa('user_role','direccionEmpresa'),
                   validateTipoIdentificacionRepLegal('user_role','tipoIdentificacionRepLegal'),
                   validateIdentificacionRepLegal('user_role','identificacionRepLegal'),
                   validateNombresRepLegal('user_role','nombresRepLegal'),
                   validateApellidosRepLegal('user_role','apellidosRepLegal'),
                   validatePasswordConfirmation('password','password2')
                  ],
      },

    );

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

    this.loadProfiles();

  }

  ngOnInit(): void {
    debugger;
    if(this.model !==null){
        this.onGetUser();
    }
  }

  saveInfo(){}
  onGetUser(){
    this.userService.getUserSub(this.model).subscribe(
    (response: UserDto) => {
      this.form.patchValue(response);
     },
    (error: any) => console.error(error)
  )
}
loadProfiles(){
  const keys = Object.keys(Profile)
  keys.forEach((key, index) => {
      this.profiles.push({
        id:Profile[index],
        profileName:Profile[index]
      })
  })
  this.profiles = this.profiles.filter(x=>String(x.profileName).length>0 && x.profileName !=undefined)
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

getErrorIdentificacionField(){

  var campo = this.form.get('identificacion');
  if (campo!= null){

    if(campo.hasError('required')){
      return 'Por favor especifique el numero de identificación';
    }
    if(campo.hasError('pattern')){
      return 'Por favor especifique solo numeros.';
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

getErrorNameField(){
  var campo = this.form.get('nombres');
  if(campo!=null){
    if(campo.hasError('nameRequired'))
      return 'Por favor especificar un nombre';
  }
  return '';
}


getErrorLastNameField(){
  var campo = this.form.get('apellidos');
  if(campo!=null){
    if(campo.hasError('lastNameRequired'))
      return 'Por favor especificar un Apellido';
  }
  return '';
}



getErrorEmailField(){
  var campo = this.form.get('correoElectronico');
  if (campo!= null){

    if(campo.hasError('required')){
      return 'Por favor especifique un correo electrónico';
    }
    if(campo.hasError('email')){
      return 'Por favor especifique un correo electrónico valido';
    }


  }
  return '';
}

getErrorTelephoneField(){
  var campo = this.form.get('telefono');
  if (campo!= null){
     debugger;
    if(campo.hasError('required')){
      return 'Por favor especifique un teléfono';
    }
    if(campo.hasError('maxLength')){
      return 'Maximo 10 digitos para el teléfono.';
    }
    if(campo.hasError('pattern')){
      return 'Por favor solo colocar numeros.';
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
    if(campo.hasError('pass1andpass2notEqual')){
      return 'La Contraseña y su confirmación no son iguales.';
    }


  }
  return '';
}

// validaciones Empresa
getErrorPlanField(){

  var campo = this.form.get('plan');
  if(campo!=null){
    if(campo.hasError('planRequired'))
      return 'POr favor especifficar el tipo de plan';
  }
  return '';
}

getErrorRazonSocialField(){
  var campo = this.form.get('razonSocialEmpresa');
  if(campo!=null){
    if(campo.hasError('razonSocialEmpresaRequired'))
      return 'Por favor especifficar la razon social';
  }
  return '';
}

getErrorDireccionEmpresaField(){
  var campo = this.form.get('direccionEmpresa');
  if(campo!=null){
    if(campo.hasError('direccionEmpresaControlRequired'))
      return 'Por favor especificar la direccion empresa.';
  }
  return '';
}

getErrorLegalrepIdTypeField(){
  var campo = this.form.get('tipoIdentificacionRepLegal');
  if(campo!=null){
    if(campo.hasError('tipoIdenRepresentanteLegalRequired'))
      return 'Por favor especificar el tipo de identificacion.';
  }
  return '';
}

getErrorLegalrepIdField(){
  var campo = this.form.get('identificacionRepLegal');
  if(campo!=null){
    if(campo.hasError('identificacionRepLegalRequired'))
      return 'Por favor especificar la identificacion del rep. legal';
  }
  return '';
}

getErrorLegalrepNamesField(){
  var campo = this.form.get('nombresRepLegal');
  if(campo!=null){
    if(campo.hasError('namesRepLegalRequired'))
      return 'Por favor especificar el nombre del rep. legal';
  }
  return '';
}

getErrorLegalrepLastNamesField(){
  var campo = this.form.get('apellidosRepLegal');
  if(campo!=null){
    if(campo.hasError('lastNameRepLegalRequired'))
      return 'Por favor especificar los apellidos del rep. legal';
  }
  return '';
}





}


