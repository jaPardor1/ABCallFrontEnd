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


  constructor(private router: Router,private formBuilder: FormBuilder, private userService: UserService) {
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
    keys.forEach((key, index) => {
      this.profiles.push({
        id: Profile[index],
        profileName: Profile[index]
      });
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
    return campo && campo.hasError('required') ? $localize `Por favor especifique un perfil` : '';
  }

  getErrorIdentificacionField() {
    const campo = this.form.get('id_number');
    if (campo) {
      if (campo.hasError('required')) return $localize `Por favor especifique el número de identificación`;
      if (campo.hasError('pattern')) return $localize `Por favor especifique solo números.`;
    }
    return '';
  }

  getErrorIdentificationTypeField() {
    const campo = this.form.get('document_type');
    return campo && campo.hasError('required') ? $localize `Por favor especifique un tipo de identificación` : '';
  }

  getErrorNameField() {
    const campo = this.form.get('name');
    return campo && campo.hasError('nameRequired') ? $localize `Por favor especificar un nombre` : '';
  }

  getErrorLastNameField() {
    const campo = this.form.get('last_name');
    return campo && campo.hasError('lastNameRequired') ? $localize `Por favor especificar un apellido` : '';
  }

  getErrorEmailField() {
    const campo = this.form.get('email');
    if (campo) {
      if (campo.hasError('required')) return $localize `Por favor especifique un correo electrónico`;
      if (campo.hasError('email')) return $localize `Por favor especifique un correo electrónico válido`;
    }
    return '';
  }

  getErrorTelephoneField() {
    const campo = this.form.get('cellphone');
    if (campo) {
      if (campo.hasError('required')) return $localize `Por favor especifique un teléfono`;
      if (campo.hasError('maxLength')) return $localize `Máximo 10 dígitos para el teléfono.`;
      if (campo.hasError('pattern')) return $localize `Por favor solo colocar números.`;
    }
    return '';
  }

  getErrorPasswordField() {
    const campo = this.form.get('password');
    if (campo) {
      if (campo.hasError('required')) return $localize `Por favor especifique una contraseña`;
      if (campo.hasError('pattern')) return $localize `Por favor validar contraseña`;
    }
    return '';
  }

  getErrorPlanField() {
    const campo = this.form.get('plan');
    return campo && campo.hasError('planRequired') ? $localize `Por favor especifique el tipo de plan` : '';
  }

  getErrorRazonSocialField() {
    const campo = this.form.get('razonSocialEmpresa');
    return campo && campo.hasError('razonSocialEmpresaRequired') ? $localize `Por favor especifique la razón social` : '';
  }

  getErrorDireccionEmpresaField() {
    const campo = this.form.get('direccionEmpresa');
    return campo && campo.hasError('direccionEmpresaControlRequired') ? $localize `Por favor especificar la dirección de la empresa.` : '';
  }

  getErrorLegalrepIdTypeField() {
    const campo = this.form.get('tipoIdentificacionRepLegal');
    return campo && campo.hasError('tipoIdenRepresentanteLegalRequired') ? $localize `Por favor especificar el tipo de identificación.` : '';
  }

  getErrorLegalrepIdField() {
    const campo = this.form.get('identificacionRepLegal');
    return campo && campo.hasError('identificacionRepLegalRequired') ? $localize `Por favor especificar la identificación del representante legal` : '';
  }

  getErrorLegalrepNamesField() {
    const campo = this.form.get('nombresRepLegal');
    return campo && campo.hasError('namesRepLegalRequired') ? $localize `Por favor especificar el nombre del representante legal` : '';
  }

  getErrorLegalrepLastNamesField() {
    const campo = this.form.get('apellidosRepLegal');
    return campo && campo.hasError('lastNameRepLegalRequired') ? $localize `Por favor especificar los apellidos del representante legal` : '';
  }
  onCancel() {
    this.router.navigate(['/listUsers']);
  }
}


