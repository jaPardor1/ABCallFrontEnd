import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router) {}


  onRegister() {
    // Lógica de registro

    // Redirigir a la página de login
    this.router.navigateByUrl('/login');
  }


  onCancel() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
