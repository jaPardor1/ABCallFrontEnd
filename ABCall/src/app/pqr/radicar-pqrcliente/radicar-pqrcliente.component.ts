import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { PqrDTO } from '../Pqr';
import { PqrService } from '../../service/pqr/pqr.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-radicar-pqrcliente',
  templateUrl: './radicar-pqrcliente.component.html',
  styleUrl: './radicar-pqrcliente.component.css'
})
export class RadicarPQRClienteComponent {

  @Output()
  public module:EventEmitter<string> = new EventEmitter<string>();
  readonly dialog = inject(MatDialog);
  constructor(private pqrService:PqrService){

  }
  ngOnInit(): void {

  }
  saveIncident(incident:PqrDTO){
    console.log(typeof(incident))
    if(incident.title !==undefined){

       this.pqrService.createIncident(incident).subscribe(
        (response)=> {
          this.openDialog('Se ha radicado el pqr #'+response.ticket_number);
        },
        (error:any)=> console.error(error)
       )
    }
 }
 openDialog(mensaje:string):void{
  this.dialog.open(DialogComponent, {
    data: {message:mensaje},
  });
}

}
