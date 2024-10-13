import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormularioPqrComponent } from './pqr/formulario-pqr/formulario-pqr.component';
import { RadicarPQRClienteComponent } from './pqr/radicar-pqrcliente/radicar-pqrcliente.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { DialogComponent } from './shared/dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormularioPqrComponent,
    RadicarPQRClienteComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
