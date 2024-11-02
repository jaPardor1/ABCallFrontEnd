import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListComponent } from './knwoledgebase/article-list/article-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormularioPqrComponent } from './pqr/formulario-pqr/formulario-pqr.component';
import { RadicarPQRClienteComponent } from './pqr/radicar-pqrcliente/radicar-pqrcliente.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { DialogComponent } from './shared/dialog/dialog.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { ListadoPqrComponent } from './pqr/listado-pqr/listado-pqr.component';
import { ListadoUsuariosComponent } from './users/listado-usuarios/listado-usuarios.component';
import { FormularioUserInternoComponent } from './users/formulario-user-interno/formulario-user-interno.component';
import { RegistroComponent } from './users/registro/registro.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { DetailDialogComponent } from './shared/detail-dialog/detail-dialog.component';
import { LoadingIndicatorComponent } from './shared/loading-indicator/loading-indicator.component';
import { LoadingInterceptor } from './loading.interceptor';
import { HeaderInterceptor } from './request-handler.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    HeaderComponent,
    FormularioPqrComponent,
    RadicarPQRClienteComponent,
    DialogComponent,
    LoginComponent,
    LayoutComponent,
    ListadoPqrComponent,
    ListadoUsuariosComponent,
    FormularioUserInternoComponent,
    RegistroComponent,
    EditUserComponent,
    ConfirmDialogComponent,
    CreateUserComponent,
    DetailDialogComponent,
    LoadingIndicatorComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:HeaderInterceptor, multi:true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




