import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {
  @Input() error: any;
  message: string;

  constructor(private errorService: ErrorService) {
  }

  ngOnInit(): void {
  }

  getMessage(): string {
    return this.errorService.getErrorMessage(this.error);
  }

}
