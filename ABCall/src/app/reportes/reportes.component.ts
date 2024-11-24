import { Component } from '@angular/core';
import { PqrService } from '../service/pqr/pqr.service';
import { ExcelServiceService } from '../service/excel/excel-service.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  startdate:Date=new Date();
  endDate:Date=new Date();
  incidenceType:string="QUEJA";
  jsonData:any;
  constructor(private pqrService:PqrService,private excelService:ExcelServiceService){

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
          this.jsonData = result;
          this.exportReport();
      },
      (error)=> console.error(error)
    );
  }

  exportReport(){
    this.excelService.exportToXls(this.jsonData, 'exported-data');
  }

}
