import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  // loadingStateChanged = new Subject<boolean>(); // we are making loading effect inside component
  serverMessage = 'Internal Serve Error, Status Code 500';

  constructor(private snackbar: MatSnackBar) {}

  // We are not using snackbar for the notification anymore check toastr service instead
  default(message: string, isHandset?: boolean) {
    this.showSnackBar(
      message,
      { panelClass: 'default-notification-overlay' },
      isHandset
    );
  }
  showInfo(message: string, isHandset?: boolean): void {
    this.showSnackBar(
      message,
      { panelClass: 'info-notification-overlay' },
      isHandset
    );
  }
  showSuccess(message: string, isHandset?: boolean): void {
    this.showSnackBar(
      message,
      { panelClass: 'success-notification-overlay' },
      isHandset
    );
  }
  showWarn(message: string, isHandset?: boolean): void {
    this.showSnackBar(
      message,
      { panelClass: 'warning-notification-overlay' },
      isHandset
    );
  }
  showError(error: any, isHandset?: boolean): void {
    const message = error.error.message
      ? error.error.message
      : this.serverMessage;
    // this.loadingStateChanged.next(false);
    console.error(message);
    this.showSnackBar(
      message,
      { panelClass: 'error-notification-overlay' },
      isHandset
    );
  }
  private showSnackBar(
    message: string = 'The request failed, Retry again',
    configuration: MatSnackBarConfig,
    isHandset?: boolean
  ): void {
    if (!isHandset) {
      {
        (configuration.verticalPosition = 'top'),
          (configuration.horizontalPosition = 'center');
      }
    }
    configuration.duration = 4000;
    const action = 'OK!';
    this.snackbar.open(message, action, configuration);
  }
}
