import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  text: string;
  cancelButtonText: string;
  acceptButtonText: string;
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
  }

  ngOnInit(): void {}
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
  onOkClick(): void {
    this.dialogRef.close(true);
  }
}
