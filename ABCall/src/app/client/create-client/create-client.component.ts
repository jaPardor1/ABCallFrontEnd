import { Component, inject } from '@angular/core';
import { ClientService } from '../../service/client/client.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ClientResultDTO } from '../clientResult';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  readonly dialog = inject(MatDialog);
  constructor(private clientService: ClientService, private router: Router, private translate: TranslateService) {
  }

  createClient(client:ClientResultDTO){
    if (client.legal_name !== undefined) {
      this.clientService.createClient(client).subscribe(
        (response: any) => {
          const message = this.translate.instant('ClientForm.clientCreated');
          this.openDialog(message);
        },
        (error: any) => {
          console.error(error.Message);
        }
      );
    }
  }

  openDialog(mensaje: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: mensaje },
    }).afterClosed().subscribe(() => {
      this.router.navigate(['clients']);
    });
  }

}
