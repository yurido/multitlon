import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private message;

  constructor() {
  }

  handleError(error: any): void {
    this.message = error.message;
  }

  getErrorMessage(error: any) {
    console.log('error: ', error);
    return error.message;
  }

}
