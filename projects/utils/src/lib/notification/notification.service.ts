import { Injectable } from "@angular/core";

import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";



@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  open(message: string): void {
    const options: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    };
    this._snackBar.open(message, 'Dismiss', options);
  }

}
