import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  
  @Output() close = new EventEmitter<boolean>();
  constructor (public modal: ModalService){}

  closeWindow(){
    this.close.emit(true)
  }
}
