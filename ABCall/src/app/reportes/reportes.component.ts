import { Component } from '@angular/core';
import { PqrService } from '../service/pqr/pqr.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  startdate:Date=new Date();
  endDate:Date=new Date();
  incidenceType:string="";
  constructor(private pqrService:PqrService){

  }
  getReport(){
    let filters = {
      start_date:this.startdate,
      end_date:this.endDate,
      incidence_type:this.incidenceType
    }
    this.pqrService.getReport(filters).subscribe(
      (result)=>{
          console.log(result);
          alert(result);
      },
      (error)=> console.error(error)
    );
  }
}
