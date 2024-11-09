import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { RadicarPQRClienteComponent } from './pqr/radicar-pqrcliente/radicar-pqrcliente.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { ListadoPqrComponent } from './pqr/listado-pqr/listado-pqr.component';
import { ListadoUsuariosComponent } from './users/listado-usuarios/listado-usuarios.component';
import { FormularioUserInternoComponent } from './users/formulario-user-interno/formulario-user-interno.component';
import { RegistroComponent } from './users/registro/registro.component';
import { AuthorizeGuard } from './authorize-guard.guard';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { ArticleListComponent } from './knwoledgebase/article-list/article-list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },{
    path:'login',
    component:LoginComponent
  },{
    path: 'registro',
    component: RegistroComponent
  },
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'createIncidence',
        component:RadicarPQRClienteComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin','Regular'],
        }
      },
      {
        path:'listIncidences',
        component:ListadoPqrComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin','Regular'],
        }
      },
      {
        path: 'articlesList',
        component: ArticleListComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin','Regular','Agent'],
        }
      },
      {
        path:'listUsers',
        component:ListadoUsuariosComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin'],
        }
      },
      {
        path:'innerUserForm',
        component:FormularioUserInternoComponent,
        data:{
          allowedRoles: ['Admin', 'Superadmin'],
        }

      },
      {
        path:'editUser/:sub',
        component:EditUserComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin'],
        }
      },
      {
        path:'createUser',
        component:CreateUserComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin'],
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
