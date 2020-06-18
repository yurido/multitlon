import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ModalConfig} from '../models/modal.config';

// TODO: subscription should be deleted when subscriber dies!
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public static DELETE_EXERCISE_ID = 'delete-exercise';

  private modalConfig: ModalConfig;
  private modalOpenEmitter = new Subject<ModalConfig>();
  private modalCloseEmitter = new Subject<ModalConfig>();

  constructor() {
  }

  sendMessageToModalWindow(modalConfig: ModalConfig): void {
    this.modalConfig = modalConfig;
    this.modalOpenEmitter.next(this.modalConfig);
  }

  onMessageToModalWindow(): Subject<ModalConfig> {
    return this.modalOpenEmitter;
  }

  onModalWindowResponse(): Subject<ModalConfig> {
    return this.modalCloseEmitter;
  }

  modalCancel(): void {
    this.modalConfig.isAccepted = false;
    this.modalCloseEmitter.next(this.modalConfig);
  }

  modalAccept(): void {
    this.modalConfig.isAccepted = true;
    this.modalCloseEmitter.next(this.modalConfig);
  }
}
