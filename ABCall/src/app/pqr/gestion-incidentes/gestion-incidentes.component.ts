import { Component } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { UserDto } from '../../users/user';
import { PqrService } from '../../service/pqr/pqr.service';
import { PqrRiskEvaluationDto } from '../PqrRiskEvaluation';

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
  constructor(private userService: UserService, private pqrService: PqrService ) {
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

  setRiskInfo(riskEvalInfo:PqrRiskEvaluationDto){
        this.riskLevel = riskEvalInfo.risk_level;
        this.riskLevelReco = riskEvalInfo.recommendation;
  }
}
