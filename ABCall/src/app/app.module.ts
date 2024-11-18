import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


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
import { ShowForRolesDirective } from './directives/show-for-roles.directive';
import { LangSelectorComponent } from './shared/lang-selector/lang-selector.component';
import { GestionIncidentesComponent } from './pqr/gestion-incidentes/gestion-incidentes.component';
import { TabsComponent } from './shared/tabs/tabs.component';

// Función de fábrica para crear el TranslateLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

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
    LoadingIndicatorComponent,
    ShowForRolesDirective,
    LangSelectorComponent,
    GestionIncidentesComponent,
    TabsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:HeaderInterceptor, multi:true},
    { provide: LOCALE_ID, useValue: 'es' },
    provideHttpClient(withInterceptorsFromDi())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




