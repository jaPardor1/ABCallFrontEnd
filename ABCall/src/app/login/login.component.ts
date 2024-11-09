import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn } from "aws-amplify/auth"
import { AuthService } from '../service/auth-service.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrorModal: boolean = false; // Controla la visibilidad del modal de error
  modalMessage: string = "";
  private subscription: Subscription = new Subscription;
  constructor(private router: Router, private formBuilder: FormBuilder,private authService:AuthService,private translate: TranslateService) {

    this.subscription=this.translate.stream('loginModule.incompleteDataError').subscribe((translatedText: string) => {
      this.modalMessage = translatedText;
    });

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Verifica si un campo es inválido
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  async onLogin2() {

    let message = ''

    if (this.loginForm.valid) {
      const { usuario, contrasena } = this.loginForm.value;
      try{
        debugger;
        const {isSignedIn} = await this.authService.login2(usuario, contrasena);

        if(isSignedIn){
          this.authService.getUserHomeByUserRole();
        }else{

          this.subscription=this.translate.stream('loginModule.errorLogin').subscribe((translatedText: string) => {
            message = translatedText;
          });

          this.modalMessage = message;
          console.error(this.modalMessage);
          this.showErrorModal = true;
        }
      }catch (error:any) {

        if(error.name=='NotAuthorizedException'){
          this.subscription=this.translate.stream('loginModule.errorLogin').subscribe((translatedText: string) => {
            message = translatedText;
          });
          this.modalMessage = message;
        }if(error.name==='UserAlreadyAuthenticatedException'){

          this.subscription=this.translate.stream('loginModule.alreadySignedUpMessage').subscribe((translatedText: string) => {
            message = translatedText;
          });
          alert(message)
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

