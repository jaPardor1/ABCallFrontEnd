import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn } from "aws-amplify/auth"
import { AuthService } from '../service/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrorModal: boolean = false; // Controla la visibilidad del modal de error
  modalMessage: string =  `Datos incompletos. Por favor, llene todos los campos.`
  constructor(private router: Router, private formBuilder: FormBuilder,private authService:AuthService) {
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

  async onLogin2() {

    if (this.loginForm.valid) {
      const { usuario, contrasena } = this.loginForm.value;
      try{
        debugger;
        const {isSignedIn} = await this.authService.login2(usuario, contrasena);

        if(isSignedIn){
          this.router.navigateByUrl('listUsers');
        }else{

          this.modalMessage = $localize  `Algo fallo en la autenticacion`;
          console.error(this.modalMessage);
          this.showErrorModal = true;
        }
      }catch (error:any) {
        if(error.name=='NotAuthorizedException'){
          this.modalMessage = $localize `Usuario o contrasena incorrectos`;
        }if(error.name==='UserAlreadyAuthenticatedException'){
              alert( $localize `usuario ya autenticado cerrando sesion..`)
              this.authService.onSignOut();
        }
        this.showErrorModal = true;
    }
  }else {
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

