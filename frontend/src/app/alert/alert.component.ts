import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ErrorService} from '../services/error.service';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {
  @Input() error: any;
  message: string;
  alertClass: any;
  faExclamationTriangle = faExclamationTriangle;

  constructor(private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.alertClass = 'alert-danger';
  }

  getMessage(): string {
    return this.errorService.getErrorMessage(this.error);
  }

  close(): void {
    this.error = undefined;
  }

}
