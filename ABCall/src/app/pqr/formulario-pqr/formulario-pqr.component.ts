import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-pqr',
  templateUrl: './formulario-pqr.component.html',
  styleUrl: './formulario-pqr.component.css'
})
export class FormularioPqrComponent implements OnInit{

  public formPqr:FormGroup;
  constructor(private formBuilder:FormBuilder){
    this.formPqr=this.formBuilder.group({
      tipoSolicitud:['',{
       validators:[Validators.required]
      }],
      asunto:[''],
      descripcion:['']
  });
  }
  ngOnInit(): void {

  }




}
