import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Para hacer las peticiones HTTP
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnDestroy {
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  modalMessage: string = '';
  registroForm: FormGroup;
  showErrorModal: boolean = false;  // Controla la visibilidad del modal
  modalType: 'error' | 'success' = 'error';
  empresas: any[] = [];  // Almacena la lista de empresas (con nombres y client_id)
  empresaNombres: string[] = [];  // Solo nombres de las empresas para el dropdown
  selectedClientId: number | null = null;  // Guardar el client_id seleccionado
  private subscription: Subscription = new Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private translate: TranslateService) {
    // Añadimos todos los campos necesarios en el form
    this.registroForm = this.formBuilder.group({
      //username: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      repetirContrasena: ['', Validators.required],
      //userRole: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      empresa: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^\\+[1-9]\\d{1,14}$')]],
      tipoComunicacion: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerEmpresas();
  }

  // Función asíncrona para manejar la lógica de inicio
  private async initializeComponent() {
    // Obtener empresas si el login fue exitoso
    this.obtenerEmpresas();
  }

  obtenerEmpresas() {
    let option='';
    this.subscription=this.translate.stream('registoModule.seleccionarEmpresa').subscribe((translatedText: string) => {
      option = translatedText;
    });
    this.http.get(`${environment.apiClientsUrl2}`)
      .subscribe((data: any) => {
        if (Array.isArray(data)) {
          // Aquí asignamos directamente el array recibido
          this.empresas = data;
          this.empresaNombres = [option, ...this.empresas.map((empresa: any) => empresa.legal_name)];
        } else {
          console.error('La respuesta no es un array de empresas esperado:', data);
        }
      }, error => {
        console.error('Error al cargar empresas', error);
      });
  }


  async onSubmit() {
    if (this.registroForm.invalid) {
      this.handleValidationErrors();
      return;
    }
    const formData = this.registroForm.value;
    
    let errorMessage = "test";
    
   
    // Verificar si el usuario seleccionó una empresa válida
    if (formData.empresa === "Seleccione una empresa" || formData.empresa==="Select a company") {
      this.subscription=this.translate.stream('registoModule.validacionSeleccionEmpresa').subscribe((translatedText: string) => {
        errorMessage = translatedText;
      });
      this.showModal('error', errorMessage);
      return;
    }

    // Obtener el client_id (id_number) basado en el nombre de la empresa seleccionada
    const empresaSeleccionada = this.empresas.find(empresa => empresa.legal_name === formData.empresa);
    if (empresaSeleccionada) {
      this.selectedClientId = empresaSeleccionada.id;  // Asigna el id_number como client_id
    } else {
      console.error('No se encontró una empresa válida para la selección realizada.');
      this.subscription=this.translate.stream('registoModule.validacionEmpresa2').subscribe((translatedText: string) => {
        errorMessage = translatedText;
      });
      
      this.showModal('error', errorMessage);
      return; // Detiene la ejecución si no hay una empresa válida seleccionada
    }

    if (!this.selectedClientId) {
      console.error('El client_id es nulo o no válido.');
      this.subscription=this.translate.stream('registoModule.validacionClientId').subscribe((translatedText: string) => {
        errorMessage = translatedText;
      });

      this.showModal('error',errorMessage);
      return; // Detiene la ejecución si `client_id` es nulo
    }
    console.log('Empresa seleccionada:', empresaSeleccionada);
    console.log('Client ID:', this.selectedClientId);



    // Datos a enviar al backend
    const usuario = {
      // username: formData.username,
      email: formData.correo,
      //user_role: "regular",
      // cognito_user_sub: cognitoUserSub,
      document_type: formData.tipoIdentificacion,
      client_id: this.selectedClientId,
      id_number: formData.identificacion,
      name: formData.nombres,
      last_name: formData.apellidos,
      communication_type: formData.tipoComunicacion,
      cellphone: formData.telefono,
      password: formData.contrasena
    };

    // Aquí se hace la llamada al microservicio de usuarios
    this.crearUsuarioEnBackend(usuario);
  }

  crearUsuarioEnBackend(usuario: any) {
   
    console.log('Datos a enviar al backend:', usuario);
    
    let message='';
    this.subscription= this.translate.stream('registoModule.ConfirmacionCreacionUsuario').subscribe((translatedText: string) => {
      message = translatedText;
    });
    this.http.post(`${environment.apiUsersUrl2}`, usuario)
      .subscribe(response => {
        console.log('Usuario creado en el backend', response);
        this.showModal('success',message );
        this.router.navigateByUrl('/login');
      }, error => {
        let errorMessage='';
        this.subscription= this.translate.stream('registoModule.validacionCreacionUsuario').subscribe((translatedText: string) => {
          errorMessage = translatedText;
        });
        console.error('Error al crear usuario en el backend', error);
        this.showModal('error', $localize`No se pudo registrar el usuario. Intente nuevamente.`);
      });
  }

  // Método para manejar errores específicos
  handleValidationErrors() {
    const controlKeys = Object.keys(this.registroForm.controls);
    let errorMessage = "test";
    for (let key of controlKeys) {
      const control = this.registroForm.get(key);

      if (control && control.invalid) {
        if (control.errors?.['required']) {
          
          this.subscription= this.translate.stream('registoModule.validacionCamposIncompletos').subscribe((translatedText: string) => {
            errorMessage = translatedText;
          });
          this.showModal('error', errorMessage);
          break;
        } else if (control.errors?.['email']) {
          this.subscription= this.translate.stream('registoModule.validacionCorreo').subscribe((translatedText: string) => {
            errorMessage = translatedText;
          });
          this.showModal('error', errorMessage);
          break;
        } else if (control.errors?.['pattern']) {
          if (key === 'identificacion') {
            this.subscription= this.translate.stream('registoModule.validacionIdentificacion').subscribe((translatedText: string) => {
              errorMessage = translatedText;
            });
            this.showModal('error', errorMessage);
            break;
          } else if (key === 'telefono') {
            this.subscription= this.translate.stream('registoModule.validacionTelefono').subscribe((translatedText: string) => {
              errorMessage = translatedText;
            });
            this.showModal('error', errorMessage);
            break;
          }
        } else {
          this.subscription= this.translate.stream('registoModule.validacionDatosGeneral').subscribe((translatedText: string) => {
            errorMessage = translatedText;
          });
          this.showModal('error', errorMessage);
          break;
        }
      }
    }

    // Marcar campos como tocados para mostrar errores
    this.showFieldErrors();
  }

  showFieldErrors() {
    Object.keys(this.registroForm.controls).forEach(field => {
      const control = this.registroForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  showModal(type: 'error' | 'success', message: string) {
    this.modalType = type;
    this.modalMessage = message;
    this.showErrorModal = true;
  }


  closeErrorModal() {
    this.showErrorModal = false; // Cierra el modal de error
  }

  onCancel() {
    this.router.navigateByUrl('/login');
    // this.logout();
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

  togglePasswordVisibility(field: string): void {
    if (field === 'contrasena') {
      this.showPassword = !this.showPassword;
    } else if (field === 'repetirContrasena') {
      this.showRepeatPassword = !this.showRepeatPassword;
    }
  }
}
