import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { UserDto } from '../../users/user';
import { PqrService } from '../../service/pqr/pqr.service';
import { PqrRiskEvaluationDto } from '../PqrRiskEvaluation';
import { AsignarPqrComponent } from '../asignar-pqr/asignar-pqr.component';
import { CerrarPqrComponent } from '../cerrar-pqr/cerrar-pqr.component';
import { AuthService } from '../../service/auth-service.service';
import { TabsComponent } from '../../shared/tabs/tabs.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-gestion-incidentes',
  templateUrl: './gestion-incidentes.component.html',
  styleUrl: './gestion-incidentes.component.css'
})
export class GestionIncidentesComponent {
  isNotFound: boolean = false;
  dataSource: any[]
  dataSource2: any[]
  displayedColumns: string[] = ['id', 'id_type', 'complete_name'];
  displayedColumns2: string[] = ['email', 'phone_number'];
  clientIdNumber: string = "";
  user_sub:string="";
  riskLevel:string="";
  riskLevelReco:string="";
  color="transparent";
  idPqr:number=0;
  pqrTicketNumber:string="";
  pqrStatus="";
  pqrData:any = {};
  @ViewChild(AsignarPqrComponent)botonAsignar!:AsignarPqrComponent;
  @ViewChild(CerrarPqrComponent)botonCerrarPqr!:CerrarPqrComponent;
  @ViewChild(TabsComponent)tabs!:TabsComponent;

  constructor(private userService: UserService,
              private pqrService: PqrService ,
              private authService: AuthService
            ) {
    this.dataSource = [{
      id: "1212551515",
      id_type: "Cedula Ciudadania",
      complete_name: "Alan Brito Gonzalez"
    }]

    this.dataSource2 = [{
      email: "prueba@prueba.co",
      phone_number: "3133096521",
    }]
  }

  searchClient() {
    this.userService.getUserClientInfo(this.clientIdNumber).subscribe(
      (response) => {
        this.listFoundinfo(response);
      },
      (error: any) => {console.error(error);   alert(error)}
    )
  }

  listFoundinfo(clientInfo: UserDto[]) {

    this.dataSource = [{
      id: clientInfo[0].id_number,
      id_type: clientInfo[0].document_type,
      complete_name: clientInfo[0].name + ' ' + clientInfo[0].last_name
    }]

    this.dataSource2 = [{
      email: clientInfo[0].email,
      phone_number: clientInfo[0].cellphone
    }]

    this.user_sub=clientInfo[0].cognito_user_sub;
  }


  evaluateRisk(info:any){
    if (info.idPqr !== undefined) {
          this.assignInfo(info);
          if(info.status!=='CERRADO'){
            this.pqrService.getIncidentRiskEvaluation(info.idPqr).subscribe(
              (response:PqrRiskEvaluationDto)=>{
                    this.setRiskInfo(response);
              },
              (error)=>{
                console.error(error);
                alert(error);
              }
            );
          }
    }
  }

  assignInfo(info:any){
    this.idPqr = info.idPqr;
    this.pqrTicketNumber = info.ticket_number;
    this.pqrStatus = info.status;
    this.pqrData={
      title:info.title,
      description: info.description,
      type: info.type
    }
  }

  setRiskInfo(riskEvalInfo:PqrRiskEvaluationDto){
        this.riskLevel = riskEvalInfo.risk_level;
        this.riskLevelReco = riskEvalInfo.recommendation;
  }

  assignPqrToCurrentAgent(){
    if(this.authService.getUserRole()=='Agent'){
      this.botonAsignar.assignIncident(this.idPqr,this.pqrData);
      this.updateIncidentList();
    }else{
      alert('Solo los agentes pueden asignarse pqr.')
    }
  }

  updateIncidentList(){
    if(this.tabs.activeTabIndex==1){
      this.tabs.activateTab(this.tabs.activeTabIndex);
    }
  }

  // closeIncident(){
  //       this.botonCerrarPqr.showClosingDialog(this.idPqr)
  //       this.updateIncidentList();
  // }

  closeIncident() {
    this.botonCerrarPqr
      .showClosingDialog(this.idPqr)
      .pipe(
        finalize(() => {
          this.updateIncidentList(); // Esto se ejecuta al final, independientemente del resultado
        })
      )
      .subscribe({
        next: () => {
          console.log('Incidente cerrado y lista actualizada.');
        },
        error: (error:any) => {
          console.error('Error al cerrar el incidente:', error);
        }
      });
  }
}
