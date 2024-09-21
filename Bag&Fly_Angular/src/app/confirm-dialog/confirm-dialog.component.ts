import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  //foracge de type
  //ConfirmDialogComponent=> boite de dialog
constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
public title="Are you sure ?";
content="Are you sure want to delete this item?";
Cancel="cancel";
Delete="confirm";
}
