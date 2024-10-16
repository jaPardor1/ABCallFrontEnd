import { Component } from '@angular/core';
import { PqrService } from '../../service/pqr.service';
import { PqrResultDto } from '../pqrResult';

@Component({
  selector: 'app-listado-pqr',
  templateUrl: './listado-pqr.component.html',
  styleUrl: './listado-pqr.component.css'
})
export class ListadoPqrComponent {
  constructor(private pqrService: PqrService) {

  }

  public incidentsList: PqrResultDto[] = [];
  displayedColumns: string[] = ['client_id', 'subject', 'description', 'status', 'date', 'estimated_close_date', 'user_id', 'type'];
  public searchIncidents() {

    this.listFoundIncidents(this.incidentsList);
    this.pqrService.getIncidents().subscribe(
      (response: PqrResultDto[]) => this.listFoundIncidents(response), //alert('se ha radicado el pqr #'+response.id),
      (error: any) => console.error(error)
    )
  }

  public listFoundIncidents(list: PqrResultDto[]) {
    console.log(list);
    this.incidentsList = list;


  }
}
