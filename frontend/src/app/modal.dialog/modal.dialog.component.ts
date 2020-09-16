import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

export interface DialogData {
  somedata: string;
  accepted: boolean;
}

@Component({
  selector: 'app-modal.dialog',
  templateUrl: './modal.dialog.component.html',
  styleUrls: ['./modal.dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
              console.log('data=', data);
    if(data === null || data === undefined) {

    }
  }

  ngOnInit(): void {}
  onCancelClick(): void {
    this.data.accepted = false;
    this.dialogRef.close();
  }
  onOkClick(): void {
    this.data.accepted = true;
    this.dialogRef.close();
  }
}
