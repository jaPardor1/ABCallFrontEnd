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
  showErrorModal: boolean = false;  // Controla la visibilidad del modal

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      empresa: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      repetirContrasena: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      // Si el formulario es válido, se redirige a login
      console.log('Formulario enviado con éxito', this.registroForm.value);
      this.router.navigateByUrl('/login');
    } else {
      // Si el formulario no es válido, se muestra el modal de error
      this.showErrorModal = true;
    }
  }

  closeErrorModal() {
    this.showErrorModal = false; // Cierra el modal de error
  }

  onCancel() {
    this.router.navigateByUrl('/login');
  }

  // Verifica si un campo es inválido
  isFieldInvalid(field: string): boolean {
    const control = this.registroForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      empresa: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      repetirContrasena: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  // Verifica que las contraseñas coincidan
  checkPasswords(group: FormGroup) {
    const pass = group.get('contrasena')?.value;
    const confirmPass = group.get('repetirContrasena')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
}
