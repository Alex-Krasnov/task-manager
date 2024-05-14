import { Component, Input } from '@angular/core';
import { HomeTasksModel } from '../_interfaces/home-tasks.model';

@Component({
  selector: 'app-home-tasks',
  templateUrl: './home-tasks.component.html',
  styleUrls: ['./home-tasks.component.css']
})
export class HomeTasksComponent{

  @Input() task!: HomeTasksModel;
  
  constructor(
  ){}

  openDesk(){
    console.log('ssdfjghj;lhgjh');
  }
}
