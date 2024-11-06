import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ABCall';
  module:string='DEMO'
  receiveMessage(mensaje:string){
    this.module=mensaje;
 }
 constructor( private translate: TranslateService){
  this.translate.setDefaultLang('es');
  this.translate.use('es');
 }
 
}
