import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, private authService: AuthService) { }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      console.error('Error:: ', error);
      this.zone.run(() => this.authService.logout());
    }
  }
}
