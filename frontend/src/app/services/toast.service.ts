import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppError, formatError } from '../utils/error.util';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(`${message}`, 'Close', { duration: 3000, panelClass: 'snackbar-success' });
  }

  error(error: AppError): void {
    const message = formatError(error);
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'snackbar-error'
    });
  }
}
