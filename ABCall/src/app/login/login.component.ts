import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrorModal: boolean = false; // Controla la visibilidad del modal de error

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  // Verifica si un campo es inválido
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  // Lógica para el botón de login
  onLogin() {
    if (this.loginForm.valid) {
      // Si el formulario es válido, redirigir
      this.router.navigateByUrl('listUsers');
    } else {
      // Si no es válido, mostrar el modal de error
      this.showErrorModal = true;
      this.loginForm.markAllAsTouched(); // Marca todos los campos como tocados para que aparezcan los errores
    }
  }

  // Cerrar el modal de error
  closeErrorModal() {
    this.showErrorModal = false;
  }

  // Navegación para crear una cuenta
  onCreateAccount() {
    this.router.navigateByUrl('registro');
  }

}

