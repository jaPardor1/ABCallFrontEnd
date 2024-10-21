import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn } from "aws-amplify/auth"


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
  async onLogin() {
    if (this.loginForm.valid) {
      const { usuario, contrasena } = this.loginForm.value;

      try {
        await signIn({
          username: usuario,
          password: contrasena,
        })
        console.log('Login success:');
        this.router.navigateByUrl('listUsers');
      } catch (error) {
        console.error('Login error:', error);

        this.showErrorModal = true;
      }
    } else {
      this.showErrorModal = true;
      this.loginForm.markAllAsTouched();
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

