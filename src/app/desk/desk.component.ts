import { Component, OnInit } from '@angular/core';
import { DeskService } from '../services/desk.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeskModel } from '../_interfaces/desk.model';
import { first, firstValueFrom } from 'rxjs';
import { TaskDeskModel } from '../_interfaces/task-desk.model';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit{

  Id!: number;
  data!: DeskModel;
  taskStatus1: TaskDeskModel[] = [];
  taskStatus2: TaskDeskModel[] = [];
  taskStatus3: TaskDeskModel[] = [];

  constructor(
    private service: DeskService,
    private route: ActivatedRoute,
    public modal: ModalService
  ){}

  ngOnInit(){
    this.getData()
  }

  async getData(){
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.data = await firstValueFrom(this.service.getData(this.Id))

    this.data.tasks_list.forEach(item => {
      switch (item.status_id) {
        case 1:
          this.taskStatus1?.push(item)
          break;
        case 2:
          this.taskStatus2?.push(item)
          break;
        case 3:
          this.taskStatus3?.push(item)
          break;
      }
    })
  }

  openNewTask(){
    this.modal.openNewTask()
  }

  reloadTask(isValid: boolean){
    console.log(isValid);
    
    if(isValid)
      window.location.reload() 
  }
}
