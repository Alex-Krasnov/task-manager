import { Component, Input } from '@angular/core';
import { HomeDesksModel } from '../_interfaces/home-desks.model';

@Component({
  selector: 'app-home-desks',
  templateUrl: './home-desks.component.html',
  styleUrls: ['./home-desks.component.css']
})
export class HomeDesksComponent {

  @Input() desk!: HomeDesksModel;
  
  constructor(
  ){}

  openDesk(){
    console.log('ssdfjghj;lhgjh');
  }

}
