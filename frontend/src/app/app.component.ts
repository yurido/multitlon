import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  openModal: boolean;
  modalText: string;
  modalCancelButton: string;
  modalAcceptButton: string;

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.modalService.modalSubscriber().subscribe(modalConfig => {
      this.openModal = true;
      this.modalText = modalConfig.getText();
      this.modalCancelButton = modalConfig.getCanceButtonText();
      this.modalAcceptButton = modalConfig.getAcceptButtonText();
    });
  }

  onModalClose(): void {
    this.openModal = false;
    this.modalService.modalCancel();
  }

  onModalAccept(): void {
    this.openModal = false;
    this.modalService.modalAccept();
  }
}
