import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/app/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {

  constructor(private _snackBar: MatSnackBar) {}
  openSnackBar(message: string, action: string,icon:string) {
    this._snackBar.openFromComponent(CustomSnackbarComponent,{
     data:{
       message:message,
       action:action,
       snackBar:this._snackBar,
       icon:icon//'report_problem for X,done for check'
     },
     panelClass:['success-snackbar'],
     duration: 2000,
     verticalPosition: 'top', 
     horizontalPosition: 'end' ,
    });
 }
}
