import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      empresa: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      repetirContrasena: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.registroForm.valid) {
      // Aquí iría la lógica de registro, como una llamada a la API
      console.log('Formulario enviado con éxito', this.registroForm.value);

      // Redirigir a la página de login después de registrar
      this.router.navigateByUrl('/login');
    } else {
      console.log('Formulario no válido');
    }
  }


  // Lógica para cancelar y redirigir a la página de login
  onCancel() {
    this.router.navigateByUrl('/login');
  }

  getErrorMessage(field: string): string {
    const control = this.registroForm.get(field);
    if (control && control.touched && control.invalid) {
      return 'Este campo es requerido';
    }
    return '';
  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      tipoIdentificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      empresa: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      identificacion: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      repetirContrasena: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }


// Verifica que el control de contraseña existe antes de acceder
checkPasswords(group: FormGroup) {
  const passControl = group.get('contrasena');
  const confirmPassControl = group.get('repetirContrasena');

  if (passControl && confirmPassControl) {
    const pass = passControl.value;
    const confirmPass = confirmPassControl.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  return null; // Devuelve null si los controles no existen
}

}
