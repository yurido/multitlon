import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ModalConfig} from '../models/modal.config';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public static DELETE_EXERCISE_ID = 'delete-exercise';

  private modalConfig: ModalConfig;
  private modalEmitter = new Subject<ModalConfig>();
  private modalCancelEmitter = new Subject<ModalConfig>();
  private modalAcceptEmitter = new Subject<ModalConfig>();

  constructor() {
  }

  openModal(modalConfig: ModalConfig): void {
    this.modalConfig = modalConfig;
    this.modalEmitter.next(modalConfig);
  }

  modalSubscriber(): Subject<ModalConfig> {
    return this.modalEmitter;
  }

  cancelSubscriber(): Subject<ModalConfig> {
    return this.modalCancelEmitter;
  }

  acceptSubscriber(): Subject<ModalConfig> {
    return this.modalAcceptEmitter;
  }

  modalCancel(): void {
    this.modalConfig.isAccepted = false;
    this.modalCancelEmitter.next(this.modalConfig);
  }

  modalAccept(): void {
    this.modalConfig.isAccepted = true;
    this.modalCancelEmitter.next(this.modalConfig);
  }
}
