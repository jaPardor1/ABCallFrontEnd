import { Component, inject } from '@angular/core';
import { PqrService } from '../../service/pqr/pqr.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-cerrar-pqr',
  templateUrl: './cerrar-pqr.component.html',
  styleUrl: './cerrar-pqr.component.css'
})
export class CerrarPqrComponent {

  readonly dialog = inject(MatDialog);
  constructor( private pqrService:PqrService,
               private translate: TranslateService

  ){

  }


//   showClosingDialog(idPqr:number) {
//     let message =  this.translate.instant('closeIncidentModule.closeMessage');
//     let closed = false;
//     this.dialog
//       .open(ConfirmDialogComponent,{
//         data: message
//       })
//       .afterClosed()
//       .subscribe((confirmed: boolean) => {
//         if (confirmed) {
//           closed = confirmed;
//           this.closeIncident(idPqr);
//         }
//       });

//   }

//  private closeIncident(idPqr:number){
//     let status={
//       status:"CERRADO"
//     }
//     this.pqrService.closeIncident(idPqr,status).subscribe(
//       (result)=>{
//         this.openDialog(result.message);
//       },
//       (error)=>{
//         this.openDialog(error)
//       }
//     );

//   }
//   openDialog(mensaje: string): void {
//     this.dialog.open(DialogComponent, {
//       data: { message: mensaje },
//     });
//   }

showClosingDialog(idPqr: number): Observable<void> {
  const message = this.translate.instant('closeIncidentModule.closeMessage');

  return this.dialog.open(ConfirmDialogComponent, { data: message }).afterClosed().pipe(
    switchMap((confirmed: boolean) => {
      if (confirmed) {
        return this.closeIncident(idPqr); // Encadena el cierre del incidente si se confirma
      } else {
        return of(undefined); // Retorna un flujo vacío si no se confirma
      }
    })
  );
}

private closeIncident(idPqr: number): Observable<void> {
  let status = { status: "CERRADO" };

  return this.pqrService.closeIncident(idPqr, status).pipe(
    tap((result) => {
      this.openDialog(result.message); // Abre el diálogo con el mensaje del resultado
    }),
    catchError((error) => {
      this.openDialog('Error al cerrar el incidente'); // Muestra un error en el diálogo
      return throwError(error); // Propaga el error
    }),
    map(() => undefined) // Convierte el flujo para retornar `void`
  );
}

private openDialog(mensaje: string): void {
  this.dialog.open(DialogComponent, {
    data: { message: mensaje },
  });
}



}
