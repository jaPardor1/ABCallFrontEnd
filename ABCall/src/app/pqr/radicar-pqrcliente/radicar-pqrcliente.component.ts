import { Component, EventEmitter, inject, Output, output, ViewChild, viewChild } from '@angular/core';
import { PqrDTO } from '../Pqr';
import { PqrService } from '../../service/pqr/pqr.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormularioPqrComponent } from '../formulario-pqr/formulario-pqr.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-radicar-pqrcliente',
  templateUrl: './radicar-pqrcliente.component.html',
  styleUrl: './radicar-pqrcliente.component.css'
})
export class RadicarPQRClienteComponent {

  @Output()
  public module:EventEmitter<string> = new EventEmitter<string>();
  readonly dialog = inject(MatDialog);
  @ViewChild(FormularioPqrComponent) child!:FormularioPqrComponent
  constructor(private pqrService:PqrService,private router:Router){

  }
  ngOnInit(): void {

  }
  saveIncident(incident:PqrDTO){
    console.log(typeof(incident))
    if(incident.title !==undefined){

       this.pqrService.createIncident(incident).subscribe(
        (response)=> {
          this.openDialog( $localize`Se ha radicado el pqr `+response.ticket_number,incident);
        },
        (error:any)=> console.error(error)
       )
    }
 }
 openDialog(mensaje:string,incident:PqrDTO):void{
  this.dialog.open(DialogComponent, {
    data: {message:mensaje},
  })
  .afterClosed()
  .subscribe(() => {
      window.location.reload();
  });


  ;
}

}
