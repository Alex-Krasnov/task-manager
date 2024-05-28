import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  isVisible$ = new BehaviorSubject<boolean>(false)
  newTaskIsVisible$ = new BehaviorSubject<boolean>(false)

  open() {
    this.isVisible$.next(true)
  }

  openNewTask() {
    this.newTaskIsVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
    this.newTaskIsVisible$.next(false)
  }
}
