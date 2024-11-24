import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
import { FlowListComponent } from './flow/flow-list/flow-list.component';
import { CreateFlowComponent } from './flow/create-flow/create-flow.component';
import { StepListComponent } from './flow/steps/step-list/step-list.component';
import { CreateStepComponent } from './flow/steps/create-step/create-step.component';
import { GestionIncidentesComponent } from './pqr/gestion-incidentes/gestion-incidentes.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { ReportesComponent } from './reportes/reportes.component';

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
        },
        providers: [
          {provide: 'tabData',useValue: {gestion:false,user_sub:null},},
          {provide: 'tabState', useValue:{}},
        ]
      },
      {
        path:'listIncidences',
        component:ListadoPqrComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin','Regular'],
        },
        providers: [
          {provide: 'tabData',useValue: {gestion:false,user_sub:null},},
          {provide: 'tabState', useValue:{}},
        ]
      },
      {
        path: 'articlesList',
        component: ArticleListComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin','Regular','Agent'],
        },
        providers: [
          {provide: 'tabData',useValue: {gestion:false,user_sub:null},},
          {provide: 'tabState', useValue:{}},
        ]
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
      {
        path:'flows',
        component:FlowListComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin'],
        }
      },
      {
        path:'createFlow',
        component:CreateFlowComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin'],
        }
      },
      {
        path:'flow/steps/:flow_id',
        component:StepListComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin'],
        }
      },
      {
        path:'flow/:flow_id/createStep',
        component:CreateStepComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Admin', 'Superadmin'],
        }
      },
      {
        path:'incidentManagement',
        component:GestionIncidentesComponent,
        canActivate:[AuthorizeGuard],
        data:{
         allowedRoles: ['Admin', 'Superadmin','Agent'],
        }
      },
      {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[AuthorizeGuard],
        data:{
         allowedRoles: ['Admin', 'Superadmin'],
        }
      },
      {
        path:'clients',
        component:ClientListComponent,
        canActivate:[AuthorizeGuard],
        data:{
         allowedRoles: ['Superadmin'],
        }
      },
      {
        path:'createClient',
        component:CreateClientComponent,
        canActivate:[AuthorizeGuard],
        data:{
         allowedRoles: ['Superadmin'],
        }
      },{
        path:'reports',
        component:ReportesComponent,
        canActivate:[AuthorizeGuard],
        data:{
          allowedRoles: ['Superadmin','Admin']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
