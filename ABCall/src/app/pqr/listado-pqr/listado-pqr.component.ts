import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { PqrService } from '../../service/pqr/pqr.service';
import { PqrResultDto } from '../pqrResult';
import { MatDialog } from '@angular/material/dialog';
import { DetailDialogComponent } from '../../shared/detail-dialog/detail-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsignarPqrComponent } from '../asignar-pqr/asignar-pqr.component';

@Component({
  selector: 'app-listado-pqr',
  templateUrl: './listado-pqr.component.html',
  styleUrl: './listado-pqr.component.css'
})
export class ListadoPqrComponent implements OnInit {


  public dataSource:any;
  displayedColumns: string[] = ['ticket_number','date','subject', 'status', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(AsignarPqrComponent)botonAsignar!:AsignarPqrComponent;
  ticketNumber:string='';
  isNotFound:boolean=true;
  incidenceList={}
  @Output() public incidentIdrequested: EventEmitter<any> = new EventEmitter<any>();

  constructor(private pqrService: PqrService,
    public dialog: MatDialog,
    @Inject('tabData') public tabData:any | null,
    @Inject('tabState') private state: any
  ) {

  }

  ngOnInit(): void {
    if(this.tabData.gestion && this.tabData.user_sub){
        this.searchIncidentsSub(this.tabData.user_sub);
    }
  }


  getState() {
    // Devuelve el estado actual del componente
    return this.incidenceList ;
  }



  public searchIncidents() {
    this.pqrService.getIncidents().subscribe(
      (response: PqrResultDto[]) => this.listFoundIncidents(response),
      (error: any) =>  console.error(error)
    )
  }

  public searchIncidentsSub(userSub:string) {
    this.pqrService.getIncidentsSub(userSub).subscribe(
      (response: PqrResultDto[]) => this.listFoundIncidents(response),
      (error: any) =>  console.error(error)
    )
  }

  public listFoundIncidents(list: PqrResultDto[]) {
    this.incidenceList = list;
    if(list.length>0){
      this.isNotFound=false;
      if(this.ticketNumber.length>0){
        list = list.filter(i=>i.ticket_number===this.ticketNumber)
        this.isNotFound=(list.length==0);
      }
      this.dataSource =new MatTableDataSource<PqrResultDto>(list);
      this.dataSource.paginator = this.paginator;
    }else{
      this.isNotFound=true;
    }


  }

  openDialog(pqrData:PqrResultDto): void {
    this.dialog.open(DetailDialogComponent, {
      data: { pqrData },
    }).afterClosed().subscribe(
      
      ()=>{
        debugger;
        if(this.tabData.gestion){
          this.incidentIdrequested.emit({
            idPqr:pqrData.id,
          });
                           
        }
      }
    );
  }
  assignIncidentToAgent(ticketNUmber:string){
       this.botonAsignar.assignIncident(ticketNUmber);
  }

}
