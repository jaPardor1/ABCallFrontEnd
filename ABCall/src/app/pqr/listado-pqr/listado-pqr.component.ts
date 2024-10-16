import { Component } from '@angular/core';
import { PqrService } from '../../service/pqr.service';
import { PqrResultDto } from '../pqrResult';

@Component({
  selector: 'app-listado-pqr',
  templateUrl: './listado-pqr.component.html',
  styleUrl: './listado-pqr.component.css'
})
export class ListadoPqrComponent {
  constructor(private pqrService:PqrService){

  }

  public incidentsList:PqrResultDto[] = []; //[{client_id:'',subject:'',description:'',status:'',date:new Date(),estimated_close_date:new Date(),user_id:'',type:''}];
  displayedColumns: string[] = ['client_id', 'subject', 'description', 'status','date','estimated_close_date','user_id','type'];
  public searchIncidents(){

    // this.incidentsList =[
    //   {
    //       client_id: "123456",
    //       subject: "Incident 1",
    //       description: "Issue with login functionality",
    //       status: "open",
    //       date: new Date("2024-10-12"),
    //       estimated_close_date: new Date("2024-10-15"),
    //       user_id: "654321",
    //       type: "bug"
    //   },
    //   {
    //       client_id: "789012",
    //       subject: "Incident 2",
    //       description: "Error processing payment",
    //       status: "close",
    //       date: new Date("2024-10-10"),
    //       estimated_close_date: new Date("2024-10-13"),
    //       user_id: "987654",
    //       type: "issue"
    //   }

  //]

  this.listFoundIncidents(this.incidentsList);
    this.pqrService.getIncidents().subscribe(
      (response:PqrResultDto[])=>this.listFoundIncidents(response) , //alert('se ha radicado el pqr #'+response.id),
      (error:any)=> console.error(error)
     )
  }

  public listFoundIncidents(list:PqrResultDto[]){
    console.log(list);
    this.incidentsList = list;


  }
}
