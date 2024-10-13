import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { PqrDTO } from '../Pqr';
import { PqrService } from '../../service/pqr.service';
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
    this.module.emit('RADICAR PQR');
  }
  saveIncident(incident:PqrDTO){
    console.log(typeof(incident))

    if(incident.hasOwnProperty('tipoSolicitud') ){
    //console.log(incident);
    let pqr = {subject:incident.asunto,description:incident.descripcion,type:incident.tipoSolicitud};
       this.pqrService.createIncident(pqr).subscribe(
        (response)=> this.openDialog('Se ha radicado el pqr #'+response.id), //alert('se ha radicado el pqr #'+response.id),
        (error:any)=> console.error(error)
       )
    }


 }
 openDialog(mensaje:string):void{
  const dialogRef = this.dialog.open(DialogComponent, {
    data: {message:mensaje},
  });
}

}
