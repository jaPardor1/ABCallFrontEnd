import { Component, ViewChild } from '@angular/core';
import { PqrService } from '../../service/pqr/pqr.service';
import { PqrResultDto } from '../pqrResult';
import { MatDialog } from '@angular/material/dialog';
import { DetailDialogComponent } from '../../shared/detail-dialog/detail-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-pqr',
  templateUrl: './listado-pqr.component.html',
  styleUrl: './listado-pqr.component.css'
})
export class ListadoPqrComponent {
  constructor(private pqrService: PqrService,public dialog: MatDialog) {

  }

  public dataSource:any;
  displayedColumns: string[] = ['subject', 'status', 'date','actions'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  ticketNumber:string='';
  public searchIncidents() {
    this.pqrService.getIncidents().subscribe(
      (response: PqrResultDto[]) => this.listFoundIncidents(response), //alert('se ha radicado el pqr #'+response.id),
      (error: any) => console.error(error)
    )
  }
  public listFoundIncidents(list: PqrResultDto[]) {

    if(this.ticketNumber.length>0){
      list = list.filter(i=>i.ticket_number===this.ticketNumber)
    }
    debugger;
    this.dataSource =new MatTableDataSource<PqrResultDto>(list);
    this.dataSource.paginator = this.paginator;

  }

  openDialog(pqrData:PqrResultDto): void {
    this.dialog.open(DetailDialogComponent, {
      data: { pqrData },
    });
  }
}
