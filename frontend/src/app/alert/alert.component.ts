import {Component, Input, OnInit, ViewEncapsulation, Inject} from '@angular/core';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface AlertData {
  error: any;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit {
  message: string;
  faExclamationTriangle = faExclamationTriangle;

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AlertData) { }

  ngOnInit(): void {
    console.error('Error.error: ', this.data.error.error);

    if (this.data.error.error !== undefined) {
      this.message = this.data.error.error.message;
    } else {
      this.message = this.data.error.message;
    }

  }

}
