import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',

})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);
  onNoClick(): void {
    this.dialogRef.close();
  }

}
