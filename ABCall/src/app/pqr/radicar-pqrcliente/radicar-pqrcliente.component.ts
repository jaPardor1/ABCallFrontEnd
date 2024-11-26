import { AfterViewInit, Component, EventEmitter, Inject, inject, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { PqrDTO } from '../Pqr';
import { PqrService } from '../../service/pqr/pqr.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormularioPqrComponent } from '../formulario-pqr/formulario-pqr.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-radicar-pqrcliente',
  templateUrl: './radicar-pqrcliente.component.html',
  styleUrl: './radicar-pqrcliente.component.css'
})
export class RadicarPQRClienteComponent implements AfterViewInit {

  @Output()
  public module: EventEmitter<string> = new EventEmitter<string>();
  readonly dialog = inject(MatDialog);
  @ViewChild(FormularioPqrComponent) child!: FormularioPqrComponent



  constructor(private pqrService: PqrService,
    private router: Router,
    private translate: TranslateService,
    @Inject('tabData') public tabData: any,
    @Inject('tabState') private state: any
  ) {

  }
  ngAfterViewInit(): void {
    try {
      if (this.isValidState(this.state) && this.child) {
        Promise.resolve().then(() => {
          this.child.setFormData(this.state);
        })
      }
    } catch (error) {
      alert('Error al establecer el estado del formulario:' + error);
    }
  }

  private isValidState(state: any): boolean {
    return state && typeof state === 'object' && state.value && 'type' in state.value && 'title' in state.value && 'description' in state.value;
  }

  saveIncident(incident: PqrDTO) {
    console.log(typeof (incident))
    if (incident.title !== undefined) {
        this.createIncident(incident);
    }
  }

  createIncident(incident: PqrDTO) {

    let pqr ;
    if(this.tabData.gestion){
      incident.user_sub = this.tabData.user_sub
      pqr = incident;
    }else{
      const {user_sub:_,... newIncident} = incident;
      pqr = newIncident;
    }

    this.pqrService.createIncident(pqr).subscribe(
      (response) => {
        let msg = this.translate.instant('createIncidentModule.incidenceCreated') + response.ticket_number
        this.openDialog(msg)
      },
      (error: any) => console.error(error.message)
    )
  }
  openDialog(mensaje: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: mensaje },
    })
      .afterClosed()
      .subscribe(() => {
        if (this.tabData.gestion) {
          this.child.form.reset();
        } else {
          this.router.navigateByUrl('listIncidences');
          //alert('resireccionar al listado')
        }
      });
  }


  getState() {
    // Devuelve el estado actual del componente
    return this.child.getFormData();
  }


}
