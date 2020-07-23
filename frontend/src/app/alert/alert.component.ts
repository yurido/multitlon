import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {
  @Input() error: any;
  message: string;
  alertClass: any;
  faExclamationTriangle = faExclamationTriangle;

  constructor() {
  }

  ngOnInit(): void {
    this.alertClass = 'alert-danger';
  }

  getMessage(): string {
    return this.error.message;
  }

  close(): void {
    this.error = undefined;
  }

}
