import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientResultDTO } from '../../client/clientResult';

@Component({
  selector: 'app-client-detail-dialog',
  templateUrl: './client-detail-dialog.component.html',
  styleUrl: './client-detail-dialog.component.css'
})
export class ClientDetailDialogComponent {

  clients:ClientResultDTO;
constructor( @Inject(MAT_DIALOG_DATA) public data:any)
  {
    this.clients = data.clientInfo;
  }
}
