
import { FormGroup, AbstractControl } from "@angular/forms";
import { Profile } from "../perfil";

export function  validatePlan(
  profileControlName: string,
  planControlName: string
) {
  return (formGroup: FormGroup) => {

    const profileControl = formGroup.controls[profileControlName];
    const planControl = formGroup.controls[planControlName];
    if (profileControl.value ===Profile.Client && planControl.value===null) {

      planControl.setErrors({ planRequired: true });
    } else {
      planControl.setErrors(null);
    }
  };
}


export function  validateNameField(
  profileControlName: string,
  NameControlName: string
) {
  return (formGroup: FormGroup) => {

    const profileControl = formGroup.controls[profileControlName];
    const nameControl = formGroup.controls[NameControlName];

    if (profileControl.value !==Profile.Client && (nameControl.value===null ||nameControl.value==='') ) {

      nameControl.setErrors({ nameRequired: true });
    } else {
      nameControl.setErrors(null);
    }
  };
}


export function  validateLastNameField(
  profileControlName: string,
  LastNameControlName: string
) {
  return (formGroup: FormGroup) => {

    const profileControl = formGroup.controls[profileControlName];
    const lastNameControl = formGroup.controls[LastNameControlName];

    if (profileControl.value !==Profile.Client && (lastNameControl.value===null ||lastNameControl.value==='') ) {

      lastNameControl.setErrors({ lastNameRequired: true });
    } else {
      lastNameControl.setErrors(null);
    }
  };
}






export function validateRazonSocial(
  profileControlName: string,
  razonSocialControlName: string
) {
  return (formGroup: FormGroup) => {

    const profileControl = formGroup.controls[profileControlName];
    const razonSocial = formGroup.controls[razonSocialControlName];
    if (profileControl.value ===Profile.Client && (razonSocial.value==='' || razonSocial.value==null )) {
      debugger;
      razonSocial.setErrors({ razonSocialEmpresaRequired: true });
    } else {
      razonSocial.setErrors(null);
    }
  };
}

export function validateDireccionEmpresa(
  profileControlName: string,
  direccionEmpresaControlName: string
) {
  return (formGroup: FormGroup) => {

    const profileControl = formGroup.controls[profileControlName];
    const direccionEmpresaControl = formGroup.controls[direccionEmpresaControlName];
    if (profileControl.value ===Profile.Client && (direccionEmpresaControl.value==='' || direccionEmpresaControl.value==null )) {

      direccionEmpresaControl.setErrors({ direccionEmpresaControlRequired: true });
    } else {
      direccionEmpresaControl.setErrors(null);
    }
  };
}


export function validateTipoIdentificacionRepLegal(
  profileControlName: string,
  validateTipoIdentificacionRepLegalName: string
) {
  return (formGroup: FormGroup) => {

    const profileControl = formGroup.controls[profileControlName];
    const validateTipoIdentificacionRepLegalControl = formGroup.controls[validateTipoIdentificacionRepLegalName];
    if (profileControl.value ===Profile.Client && (validateTipoIdentificacionRepLegalControl.value==='' || validateTipoIdentificacionRepLegalControl.value==null )) {
      validateTipoIdentificacionRepLegalControl.setErrors({ tipoIdenRepresentanteLegalRequired: true });
    } else {
      validateTipoIdentificacionRepLegalControl.setErrors(null);
    }
  };
}

export function validateIdentificacionRepLegal(
  profileControlName: string,
  IdentificacionRepLegalControlName: string
) {
  return (formGroup: FormGroup) => {

    const profileControl = formGroup.controls[profileControlName];
    const identificacionRepLegalControl = formGroup.controls[IdentificacionRepLegalControlName];
    if (profileControl.value ===Profile.Client && (identificacionRepLegalControl.value==='' || identificacionRepLegalControl.value==null )) {
      identificacionRepLegalControl.setErrors({ identificacionRepLegalRequired: true });
    } else {
      identificacionRepLegalControl.setErrors(null);
    }
  };
}

export function validateNombresRepLegal(
  profileControlName: string,
  nombresRepLegalControlName: string
) {
  return (formGroup: FormGroup) => {

    const profileControl = formGroup.controls[profileControlName];
    const nombresRepLegalControl = formGroup.controls[nombresRepLegalControlName];
    if (profileControl.value ===Profile.Client && (nombresRepLegalControl.value==='' || nombresRepLegalControl.value==null )) {
      nombresRepLegalControl.setErrors({ namesRepLegalRequired: true });
    } else {
      nombresRepLegalControl.setErrors(null);
    }
  };
}

export function validateApellidosRepLegal(
  profileControlName: string,
  ApellidosRepLegalControlName: string
) {
  return (formGroup: FormGroup) => {

    const profileControl = formGroup.controls[profileControlName];
    const ApellidosRepLegalControl = formGroup.controls[ApellidosRepLegalControlName];
    if (profileControl.value ===Profile.Client && (ApellidosRepLegalControl.value==='' || ApellidosRepLegalControl.value==null )) {
      ApellidosRepLegalControl.setErrors({ lastNameRepLegalRequired: true });
    } else {
      ApellidosRepLegalControl.setErrors(null);
    }
  };
}

export function validatePasswordConfirmation(
  password1ControlName: string,
  password2ControlName: string
) {
  return (formGroup: FormGroup) => {

    const password1Control = formGroup.controls[password1ControlName];
    const password2Control = formGroup.controls[password2ControlName];
    if (password1Control.value !== password2Control.value ) {
      password1Control.setErrors({ pass1andpass2notEqual: true });
    } else {
      password1Control.setErrors(null);
    }
  };
}








