import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  isVisible$ = new BehaviorSubject<boolean>(false)
  newTaskIsVisible$ = new BehaviorSubject<boolean>(false)
  newDeskIsVisible$ = new BehaviorSubject<boolean>(false)

  open() {
    this.isVisible$.next(true)
  }

  openNewTask() {
    this.newTaskIsVisible$.next(true)
  }

  openNewDesk() {
    this.newDeskIsVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
    this.newTaskIsVisible$.next(false)
    this.newDeskIsVisible$.next(false)
  }
}
