import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientResultDTO, PlanType, DocumentType } from '../clientResult';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  @Input() model: ClientResultDTO | null = null;
  @Output() submit: EventEmitter<ClientResultDTO> = new EventEmitter<ClientResultDTO>();
  public form: FormGroup;
  public submitted = false;
  planTypes = Object.values(PlanType)
  documentTypes = Object.values(DocumentType)

  constructor(private formBuilder: FormBuilder, private translate: TranslateService) {
    this.form = this.formBuilder.group({
      perfil: ['', [Validators.required, Validators.minLength(3)]],
      id_type: ['', [Validators.required]],
      legal_name: ['', [Validators.required, Validators.minLength(3)]],
      id_number: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      type_document_rep: ['', [Validators.required]],
      id_rep_lega: ['', [Validators.required, Validators.minLength(3)]],
      name_rep: ['', [Validators.required, Validators.minLength(3)]],
      last_name_rep: ['', [Validators.required, Validators.minLength(3)]],
      email_rep: ['', [Validators.required, Validators.email]],
      plan_type: ['', [Validators.required]],
      cellphone: ['', []]
    });
  }

  ngOnInit() {
  }

  saveInfo() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getErrorPerfil(): string {
    const campo = this.form.get('perfil');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.profileRequired');
      if(campo.hasError('minlength')) return this.translate.instant('ClientForm.profileMinLenght');
    }
    return ""
  }


  getErrorIdType(): string {
    const campo = this.form.get('id_type');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.idTypeRequired');
    }
    return '';
  }
  
  getErrorLegalName(): string {
    const campo = this.form.get('legal_name');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.legalNameRequired');
      if (campo.hasError('minlength')) return this.translate.instant('ClientForm.legalNameMinLength');
    }
    return '';
  }
  
  getErrorIdNumber(): string {
    const campo = this.form.get('id_number');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.idNumberRequired');
      if (campo.hasError('minlength')) return this.translate.instant('ClientForm.idNumberMinLength');
    }
    return '';
  }
  
  getErrorAddress(): string {
    const campo = this.form.get('address');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.addressRequired');
      if (campo.hasError('minlength')) return this.translate.instant('ClientForm.addressMinLength');
    }
    return '';
  }
  
  getErrorTypeDocumentRep(): string {
    const campo = this.form.get('type_document_rep');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.typeDocumentRepRequired');
    }
    return '';
  }
  
  getErrorIdRepLega(): string {
    const campo = this.form.get('id_rep_lega');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.idRepLegaRequired');
      if (campo.hasError('minlength')) return this.translate.instant('ClientForm.idRepLegaMinLength');
    }
    return '';
  }
  
  getErrorNameRep(): string {
    const campo = this.form.get('name_rep');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.nameRepRequired');
      if (campo.hasError('minlength')) return this.translate.instant('ClientForm.nameRepMinLength');
    }
    return '';
  }
  
  getErrorLastNameRep(): string {
    const campo = this.form.get('last_name_rep');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.lastNameRepRequired');
      if (campo.hasError('minlength')) return this.translate.instant('ClientForm.lastNameRepMinLength');
    }
    return '';
  }
  
  getErrorEmailRep(): string {
    const campo = this.form.get('email_rep');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.emailRepRequired');
      if (campo.hasError('email')) return this.translate.instant('ClientForm.emailRepInvalid');
    }
    return '';
  }
  
  getErrorPlanType(): string {
    const campo = this.form.get('plan_type');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('ClientForm.planTypeRequired');
    }
    return '';
  }

  onCancel() {
    this.form.reset();
    this.submitted = false;
  }

}
