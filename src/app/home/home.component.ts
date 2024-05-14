import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { HomeDesksModel } from '../_interfaces/home-desks.model';
import { HomeTasksModel } from '../_interfaces/home-tasks.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  desks: HomeDesksModel[] = []
  tasks: HomeTasksModel[] = []
  
  constructor(
    private service: HomeService
  ){}
  
  ngOnInit(): void {
    this.getData()
  }

  async getData(){
    this.desks = await firstValueFrom(this.service.getDesks())
    this.tasks = await firstValueFrom(this.service.getTasks())
  }
}
