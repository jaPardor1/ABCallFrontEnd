import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor( private router:Router){

  }

  onLogin(){

    //this.router.navigate(["listIncidences"]);

    //this.router.navigate(["createIncidence"]);

    this.router.navigateByUrl('listUsers');
  }
}
