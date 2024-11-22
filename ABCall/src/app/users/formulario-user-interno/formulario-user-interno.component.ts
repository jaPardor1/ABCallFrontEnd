import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileDTO } from '../profile';
import { DocumentId } from '../documentId';
import { SubscriptionDTO } from '../subscription';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { validateApellidosRepLegal, validateDireccionEmpresa, validateIdentificacionRepLegal, validateLastNameField, validateNameField, validateNombresRepLegal, validatePasswordConfirmation, validatePlan, validateRazonSocial, validateTipoIdentificacionRepLegal } from '../validations/userFormValidations';
import { UserDto } from '../user';
import { Profile } from '../perfil';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-formulario-user-interno',
  templateUrl: './formulario-user-interno.component.html',
  styleUrls: ['./formulario-user-interno.component.css']
})
export class FormularioUserInternoComponent implements OnInit {
  @Input() model: string | null;
  @Output() submit: EventEmitter<UserDto> = new EventEmitter<UserDto>();
  public form: FormGroup;
  public profiles = [{ id: '', profileName: '' }];
  public documentIds = [{ id: '', documentName: '' }];
  public subscriptionsPlan: SubscriptionDTO[];
  public submitted: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private translate: TranslateService // Inyección de ngx-translate
  ) {
    this.model = null;

    this.form = this.formBuilder.group({
      user_role: ['', [Validators.required]],
      plan: [],
      document_type: ['', [Validators.required]],
      id_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      razonSocialEmpresa: [],
      direccionEmpresa: [],
      tipoIdentificacionRepLegal: [],
      identificacionRepLegal: [],
      nombresRepLegal: [],
      apellidosRepLegal: [],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$'), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,}$')]],
      password2: ['', Validators.required],
      cognito_user_sub: [''],
      client_id: ['1'],
      communication_type: ['Telefono']
    },
    {
      validator: [
        validatePlan('user_role', 'plan'),
        validateRazonSocial('user_role', 'razonSocialEmpresa'),
        validateNameField('user_role', 'name'),
        validateLastNameField('user_role', 'last_name'),
        validateDireccionEmpresa('user_role', 'direccionEmpresa'),
        validateTipoIdentificacionRepLegal('user_role', 'tipoIdentificacionRepLegal'),
        validateIdentificacionRepLegal('user_role', 'identificacionRepLegal'),
        validateNombresRepLegal('user_role', 'nombresRepLegal'),
        validateApellidosRepLegal('user_role', 'apellidosRepLegal'),
        validatePasswordConfirmation('password', 'password2')
      ]
    });

    this.subscriptionsPlan = [
      { id: 1, subscrptionName: 'Emprendedor' },
      { id: 2, subscrptionName: 'Empresario' },
      { id: 3, subscrptionName: 'Empresario +' }
    ];

    this.loadProfiles();
    this.loadIdTypes();
  }

  ngOnInit(): void {
    if (this.model !== null) {
      this.onGetUser();
    }
  }

  saveInfo() {
    this.submitted = true;
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onGetUser() {
    this.userService.getUserSub(this.model).subscribe(
      (response: UserDto) => {
        response.password = '123456';
        response.password2 = '123456';
        this.form.patchValue(response);
      },
      (error: any) => console.error(error)
    );
  }

  loadProfiles() {
    const keys = Object.keys(Profile);
    debugger;
    keys.forEach((key, index) => {
      if(Profile[index]!=='Client'){
        this.profiles.push({
          id: Profile[index],
          profileName: Profile[index]
        });
      }
    });
    
    this.profiles = this.profiles.filter(x => String(x.profileName).length > 0 && x.profileName !== undefined);
  }

  loadIdTypes() {
    const keys = Object.keys(DocumentId);
    keys.forEach((key, index) => {
      this.documentIds.push({
        id: DocumentId[index],
        documentName: DocumentId[index]
      });
    });
    this.documentIds = this.documentIds.filter(x => String(x.documentName).length > 0 && x.documentName !== undefined);
  }

  // Errores
  getErrorProfileField() {
    const campo = this.form.get('user_role');
    return campo && campo.hasError('required') ? this.translate.instant('UserFormModule.perfilReq') : '';
  }

  getErrorIdentificacionField() {
    const campo = this.form.get('id_number');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('UserFormModule.idNumReq');
      if (campo.hasError('pattern')) return this.translate.instant('UserFormModule.numOnly');
    }
    return '';
  }

  getErrorIdentificationTypeField() {
    const campo = this.form.get('document_type');
    return campo && campo.hasError('required') ? this.translate.instant('UserFormModule.idTypeReq') : '';
  }

  getErrorNameField() {
    const campo = this.form.get('name');
    return campo && campo.hasError('nameRequired') ? this.translate.instant('UserFormModule.nameReq') : '';
  }

  getErrorLastNameField() {
    const campo = this.form.get('last_name');
    return campo && campo.hasError('lastNameRequired') ? this.translate.instant('UserFormModule.lastNameReq') : '';
  }

  getErrorEmailField() {
    const campo = this.form.get('email');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('UserFormModule.emailReq');
      if (campo.hasError('email')) return this.translate.instant('UserFormModule.emailValid');
    }
    return '';
  }

  getErrorTelephoneField() {
    const campo = this.form.get('cellphone');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('UserFormModule.phoneReq');
      if (campo.hasError('maxLength')) return this.translate.instant('UserFormModule.phoneMax');
      if (campo.hasError('pattern')) return this.translate.instant('UserFormModule.phoneNumOnly');
    }
    return '';
  }

  getErrorPasswordField() {
    const campo = this.form.get('password');
    if (campo) {
      if (campo.hasError('required')) return this.translate.instant('UserFormModule.passReq');
      if (campo.hasError('pattern')) return this.translate.instant('UserFormModule.passValid');
    }
    return '';
  }

  getErrorPlanField() {
    const campo = this.form.get('plan');
    return campo && campo.hasError('planRequired') ? this.translate.instant('UserFormModule.planReq') : '';
  }

  getErrorRazonSocialField() {
    const campo = this.form.get('razonSocialEmpresa');
    return campo && campo.hasError('razonSocialEmpresaRequired') ? this.translate.instant('UserFormModule.razonSocialReq') : '';
  }

  getErrorDireccionEmpresaField() {
    const campo = this.form.get('direccionEmpresa');
    return campo && campo.hasError('direccionEmpresaControlRequired') ? this.translate.instant('UserFormModule.direccionEmpReq') : '';
  }

  getErrorLegalrepIdTypeField() {
    const campo = this.form.get('tipoIdentificacionRepLegal');
    return campo && campo.hasError('tipoIdenRepresentanteLegalRequired') ? this.translate.instant('UserFormModule.repLegalIdTypeReq') : '';
  }

  getErrorLegalrepIdField() {
    const campo = this.form.get('identificacionRepLegal');
    return campo && campo.hasError('identificacionRepLegalRequired') ? this.translate.instant('UserFormModule.repLegalIdReq') : '';
  }

  getErrorLegalrepNamesField() {
    const campo = this.form.get('nombresRepLegal');
    return campo && campo.hasError('namesRepLegalRequired') ? this.translate.instant('UserFormModule.repLegalNameReq') : '';
  }

  getErrorLegalrepLastNamesField() {
    const campo = this.form.get('apellidosRepLegal');
    return campo && campo.hasError('lastNameRepLegalRequired') ? this.translate.instant('UserFormModule.repLegalLastNameReq') : '';
  }

  onCancel() {
    this.router.navigate(['/listUsers']);
  }
}
