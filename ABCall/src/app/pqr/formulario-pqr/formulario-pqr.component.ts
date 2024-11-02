import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PqrDTO} from "../Pqr";

@Component({
  selector: 'app-formulario-pqr',
  templateUrl: './formulario-pqr.component.html',
  styleUrl: './formulario-pqr.component.css'
})
export class FormularioPqrComponent implements OnInit{

  public form:FormGroup;
  @Output()
  public submit:EventEmitter<PqrDTO> = new EventEmitter<PqrDTO>();

  public tipoSolicitud:any[]=[{id:'Peticion',tiposol:'Peticion'},{id:'Queja',tiposol:'Queja'},{id:'Reclamo',tiposol:'Reclamo'}];
  constructor(private formBuilder:FormBuilder){
   this.form= this.formBuilder.group({
      type:['',{
       validators:[Validators.required]
      }],
      title:['',{
        validators:[Validators.required]
      }],
      description:['',{
        validators:[Validators.required,Validators.maxLength(500)]
      }]
  });

  }
  ngOnInit(): void {

  }

  saveInfo(){
     this.submit.emit(this.form.value);
  }


  getErrorRequestTypeField(){
    var campo = this.form.get('tipoSolicitud');
    if (campo!= null){
      if(campo.hasError('required')){
        return 'Por favor especifique el tipo de solicitud';
      }
    }
    return '';
  }


  getErrorDescriptionField(){
    var campo = this.form.get('descripcion');
    if (campo!= null){
      if(campo.hasError('required')){
        return 'Por favor especifique una descripción';
      }
      if (campo.hasError('maxlength')){
        return 'La descripción solo puede almacenar maximo: '+campo.getError('maxlength').requiredLength+' Caracteres.';
      }
    }
    return '';
  }

  getErrorSubjectField(){
    var campo = this.form.get('asunto');
    if (campo!= null){

      if(campo.hasError('required')){
        return 'Por favor especifique un asunto';
      }
    }
    return '';
  }




}
