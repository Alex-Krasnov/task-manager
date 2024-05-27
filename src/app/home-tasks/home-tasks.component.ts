import { Component, Input } from '@angular/core';
import { HomeTasksModel } from '../_interfaces/home-tasks.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-tasks',
  templateUrl: './home-tasks.component.html',
  styleUrls: ['./home-tasks.component.css']
})
export class HomeTasksComponent{

  @Input() task!: HomeTasksModel;
  
  constructor(
    private router: Router
  ){}

  openDesk(){
    this.router.navigate(['main/desk/'+this.task.desk_id])
  }
}
