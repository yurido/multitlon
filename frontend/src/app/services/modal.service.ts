import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ModalConfig} from '../models/modal.config';

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

  openModal(modalConfig: ModalConfig): void {
    this.modalConfig = modalConfig;
    this.modalOpenEmitter.next(modalConfig);
  }

  modalOpenSubscriber(): Subject<ModalConfig> {
    return this.modalOpenEmitter;
  }

  modalCloseSubscriber(): Subject<ModalConfig> {
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
