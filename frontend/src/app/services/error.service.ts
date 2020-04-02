import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private message;

  constructor() {
  }

  getErrorMessage(error: any) {
    return error.message;
  }

}
