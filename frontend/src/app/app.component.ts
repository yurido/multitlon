import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  modalText: string;
  modalCancelButton: string;
  modalAcceptButton: string;

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.modalService.modalOpenSubscriber().subscribe(modalConfig => {
      this.modalText = modalConfig.getText();
      this.modalCancelButton = modalConfig.getCanceButtonText();
      this.modalAcceptButton = modalConfig.getAcceptButtonText();
    });
  }

  onModalClose(): void {
    this.modalService.modalCancel();
  }

  onModalAccept(): void {
    this.modalService.modalAccept();
  }
}
