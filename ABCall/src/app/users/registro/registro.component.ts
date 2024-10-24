import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Para hacer las peticiones HTTP
import { environment } from '../../../environments/environment';
import { SignInOutput, signUp, signIn, signOut } from "aws-amplify/auth";
import { CognitoIdentityProviderClient, InitiateAuthCommand, AuthFlowType  } from "@aws-sdk/client-cognito-identity-provider";

// Configuración del cliente de Cognito
const client = new CognitoIdentityProviderClient({
  region: environment.cognito.region,
});

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  showErrorModal: boolean = false;  // Controla la visibilidad del modal
  empresas: any[] = [];  // Almacena la lista de empresas (con nombres y client_id)
  empresaNombres: string[] = [];  // Solo nombres de las empresas para el dropdown
  selectedClientId: number | null = null;  // Guardar el client_id seleccionado
  idToken: string | null = null;  // Token de autenticación

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    // Añadimos todos los campos necesarios en el form
    this.registroForm = this.formBuilder.group({
      username: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      repetirContrasena: ['', Validators.required],
      userRole: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      empresa: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      tipoComunicacion: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  ngOnInit(): void {
    // Llama a la función asíncrona que maneja el inicio
    this.initializeComponent();
  }

  // Función asíncrona para manejar la lógica de inicio
  private async initializeComponent() {
    // Iniciar sesión antes de hacer cualquier cosa
    await this.loginSuperAdmin();
    // Obtener empresas si el login fue exitoso
    if (this.idToken) {
      this.obtenerEmpresas();
    }
  }


  // Método para iniciar sesión con usuario predeterminado
  async loginSuperAdmin() {
    const usuario = 'andresulloa@test.com';  // Cambia por tu usuario SuperAdmin
    const contrasena = 'ABCpassword123!';  // Cambia por tu contraseña SuperAdmin

    try {
      // Configura los parámetros para iniciar sesión utilizando los datos del environment.ts
      const params = {
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        ClientId: environment.cognito.userPoolWebClientId,  // Obtiene el Client ID desde environment.ts
        AuthParameters: {
          USERNAME: usuario,
          PASSWORD: contrasena,
        },
      };

      // Ejecuta la autenticación
      const command = new InitiateAuthCommand(params);
      const response = await client.send(command);

      if (response.AuthenticationResult && response.AuthenticationResult.IdToken) {
        // Captura el idToken
        this.idToken = response.AuthenticationResult?.IdToken || null;
        console.log('Login success, ID Token:', this.idToken);
      } else {
        console.error('No se pudo obtener el token de autenticación');
      }
    } catch (error) {
      console.error('Login error:', error);
      this.showErrorModal = true;
    }
  }



    obtenerEmpresas() {
      if (!this.idToken) {
        console.error('No se puede obtener empresas sin el token');
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.idToken}`);

      this.http.get(`${environment.apiClientsUrl}`, { headers })
        .subscribe((data: any) => {
          this.empresas = data.empresas;
          this.empresaNombres = this.empresas.map((empresa: any) => empresa.legal_name);
        }, error => {
          console.error('Error al cargar empresas', error);
        });
    }


  // Nota: Ahora esta función es asíncrona
  async onSubmit() {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;

    // Obtener el client_id (id_number) basado en el nombre de la empresa seleccionada
    const empresaSeleccionada = this.empresas.find(empresa => empresa.legal_name === formData.empresa);
    if (empresaSeleccionada) {
      this.selectedClientId = empresaSeleccionada.id_number;  // Asigna el id_number como client_id
    }

      try {
        // Registro de usuario en Cognito
        const { isSignUpComplete, userId, nextStep } = await signUp({
          username: this.registroForm.value.username,  // Usuario
          password: this.registroForm.value.contrasena, // Contraseña
          options: {
            userAttributes: {
              email: this.registroForm.value.correo, // Email
              phone_number: this.registroForm.value.telefono, // Número de teléfono (formato E.164)
            },
          },
        });

        // 'userId' contiene el 'sub' de Cognito (ID del usuario)
        const cognitoUserSub = userId;

        // Datos a enviar al backend
        const usuario = {
          username: formData.username,
          email: formData.correo,
          user_role: formData.userRole,
          cognito_user_sub: cognitoUserSub,
          document_type: formData.tipoIdentificacion,
          client_id: this.selectedClientId,
          id_number: formData.identificacion,
          name: formData.nombres,
          last_name: formData.apellidos,
          communication_type: formData.tipoComunicacion,
          cellphone: formData.telefono
        };

        // Aquí se hace la llamada al microservicio de usuarios
        this.crearUsuarioEnBackend(usuario);

      } catch (error) {
        console.error('Error al registrar usuario en Cognito', error);
        this.showErrorModal = true;  // Muestra el modal de error si ocurre algún problema
      }
    } else {
      this.showErrorModal = true;
    }
  }

  crearUsuarioEnBackend(usuario: any) {
    if (!this.idToken) {
      console.error('No se puede crear el usuario sin token');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.idToken}`);

    this.http.post(`${environment.apiUsersUrl}`, usuario, { headers })
      .subscribe(response => {
        console.log('Usuario creado en el backend', response);
        this.router.navigateByUrl('/login');
      }, error => {
        console.error('Error al crear usuario en el backend', error);
      });
  }
  // Método para hacer logout
  async logout() {
    try {
      await signOut();
      console.log('Sign out success');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  closeErrorModal() {
    this.showErrorModal = false; // Cierra el modal de error
  }

  onCancel() {
    this.router.navigateByUrl('/login');
    this.logout();
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registroForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  // Verifica que las contraseñas coincidan
  checkPasswords(group: FormGroup) {
    const pass = group.get('contrasena')?.value;
    const confirmPass = group.get('repetirContrasena')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
}





