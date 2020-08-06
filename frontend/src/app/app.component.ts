import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from './services/modal.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  modalText: string;
  modalCancelButton: string;
  modalAcceptButton: string;
  private modalWindowSubscription: Subscription;

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.modalService.onMessageToModalWindow().subscribe(
      modalConfig => {
        console.log('Modal Window getting new message: ', modalConfig.getId());
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

  ngOnDestroy(): void {
    this.modalWindowSubscription.unsubscribe();
  }
}
