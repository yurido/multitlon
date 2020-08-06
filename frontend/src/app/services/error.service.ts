import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorEmitter = new Subject<any>();

  constructor() {
  }

  handleError(error: any): void {
    this.errorEmitter.next(error);
  }

  onError(): Subject<any> {
    return this.errorEmitter;
  }
}
