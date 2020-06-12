import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  @Input() text: string;
  @Input() onCancelF: any
  @Input() onYesF: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.onCancelF();
  }

  onYes(): void {
    this.onYesF();
  }
}
