import { Component, Input } from '@angular/core';
import { HomeDesksModel } from '../_interfaces/home-desks.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-desks',
  templateUrl: './home-desks.component.html',
  styleUrls: ['./home-desks.component.css']
})
export class HomeDesksComponent {

  @Input() desk!: HomeDesksModel;
  
  constructor(
    private router: Router
  ){}

  openDesk(){
    this.router.navigate(['main/desk/'+this.desk.id])
  }
}
