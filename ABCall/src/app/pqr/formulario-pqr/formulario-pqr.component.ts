import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PqrDTO } from "../Pqr";
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private formBuilder: FormBuilder, private translate: TranslateService) {
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
      return this.translate.instant('createIncidentModule.tipoSolicitudRequerido');
    }
    return '';
  }

  getErrorDescriptionField() {
    const campo = this.form.get('description');
    if (campo?.hasError('required')) {
      return this.translate.instant('createIncidentModule.descripcionRequerida');
    }
    if (campo?.hasError('maxlength')) {
      return this.translate.instant('createIncidentModule.descripcionMaxima', {maxLength: campo.getError('maxlength').requiredLength});
    }
    return '';
  }

  getErrorSubjectField() {
    const campo = this.form.get('title');
    if (campo?.hasError('required')) {
      return this.translate.instant('createIncidentModule.asuntoRequerido');
    }
    return '';
  }
}
