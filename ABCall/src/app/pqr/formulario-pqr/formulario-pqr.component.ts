import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PqrDTO } from "../Pqr";

@Component({
  selector: 'app-formulario-pqr',
  templateUrl: './formulario-pqr.component.html',
  styleUrls: ['./formulario-pqr.component.css']
})
export class FormularioPqrComponent implements OnInit {

  public form: FormGroup;
  @Output() public submit: EventEmitter<PqrDTO> = new EventEmitter<PqrDTO>();

  public tipoSolicitud: any[] = [
    { id: 'Peticion', tiposol: 'Peticion' },
    { id: 'Queja', tiposol: 'Queja' },
    { id: 'Reclamo', tiposol: 'Reclamo' }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      type: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {}

  saveInfo() {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para activar los errores
    }
  }

  getErrorRequestTypeField() {
    const campo = this.form.get('type');
    if (campo?.hasError('required')) {
      return $localize `Por favor especifique el tipo de solicitud`;
    }
    return '';
  }

  getErrorDescriptionField() {
    const campo = this.form.get('description');
    if (campo?.hasError('required')) {
      return $localize `Por favor especifique una descripción`;
    }
    if (campo?.hasError('maxlength')) {
      return $localize `La descripción solo puede almacenar máximo: ${campo.getError('maxlength').requiredLength} caracteres.`;
    }
    return '';
  }

  getErrorSubjectField() {
    const campo = this.form.get('title');
    if (campo?.hasError('required')) {
      return $localize `Por favor especifique un asunto`;
    }
    return '';
  }
}
