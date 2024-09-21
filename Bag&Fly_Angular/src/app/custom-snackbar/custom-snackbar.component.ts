import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomSnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any){

  }
  closeSnackbar(){
    this.data.snackBar.dismiss();
  }
}
