import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { RadicarPQRClienteComponent } from './pqr/radicar-pqrcliente/radicar-pqrcliente.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { ListadoPqrComponent } from './pqr/listado-pqr/listado-pqr.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },{
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'createIncidence',
        component:RadicarPQRClienteComponent
      },
      {
        path:'listIncidences',
        component:ListadoPqrComponent
      },


    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
