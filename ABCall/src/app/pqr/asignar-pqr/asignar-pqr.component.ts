import { Message } from './../../../../node_modules/@smithy/eventstream-codec/dist-types/Message.d';
import { Component, inject, Input } from '@angular/core';
import { PqrService } from '../../service/pqr/pqr.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-asignar-pqr',
  templateUrl: './asignar-pqr.component.html',
  styleUrl: './asignar-pqr.component.css'
})
export class AsignarPqrComponent {

  readonly dialog = inject(MatDialog);
  constructor(private pqrService:PqrService,
              private translate: TranslateService,
  ){


  }

  assignIncident(idPqr:number,pqrData:any){
      this.pqrService.assignIncidence(idPqr,pqrData).subscribe(
        (response)=>{
          let mensaje = this.translate.instant('assignIncidentModule.message');
          this.dialog.open(DialogComponent, {
            data: { message: mensaje },
          })
        }
        ,
        (error)=>alert(error.Message)
      );
  }
}
