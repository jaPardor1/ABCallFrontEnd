import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PqrResultDto } from '../../pqr/pqrResult';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrl: './detail-dialog.component.css'
})
export class DetailDialogComponent {


  pqr:PqrResultDto;
  constructor( @Inject(MAT_DIALOG_DATA) public data:any)
  {
    this.pqr = data.pqrData;
  }
}
