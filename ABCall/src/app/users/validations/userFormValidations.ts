
import { FormGroup, AbstractControl } from "@angular/forms";

export function  validatePlan(
  profileControlName: string,
  planControlName: string
) {
  return (formGroup: FormGroup) => {

    const profileControl = formGroup.controls[profileControlName];
    const planControl = formGroup.controls[planControlName];
    if (profileControl.value ===3 && planControl.value===null) {

      planControl.setErrors({ planRequired: true });
    } else {
      planControl.setErrors(null);
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
    if (profileControl.value ===3 && (razonSocial.value==='' || razonSocial.value==null )) {
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
    if (profileControl.value ===3 && (direccionEmpresaControl.value==='' || direccionEmpresaControl.value==null )) {

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
    if (profileControl.value ===3 && (validateTipoIdentificacionRepLegalControl.value==='' || validateTipoIdentificacionRepLegalControl.value==null )) {
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
    if (profileControl.value ===3 && (identificacionRepLegalControl.value==='' || identificacionRepLegalControl.value==null )) {
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
    if (profileControl.value ===3 && (nombresRepLegalControl.value==='' || nombresRepLegalControl.value==null )) {
      nombresRepLegalControl.setErrors({ identificacionRepLegalRequired: true });
    } else {
      nombresRepLegalControl.setErrors(null);
    }
  };
}
