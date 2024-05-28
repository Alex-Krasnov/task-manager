import { Component, Input, OnInit } from '@angular/core';
import { TaskDeskModel } from '../_interfaces/task-desk.model';
import { TaskService } from '../services/task.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
  @Input() task!: TaskDeskModel;
  usrList: string = "";
  isModalOpen = false;

  constructor(
    private service: TaskService,
    public modal: ModalService
  ){}

  ngOnInit() {
    this.task.users_list.forEach(item => {
      this.usrList += item.name + " "
    })
  }

  updateStatus(next:boolean){
    let status = this.task.status_id
    if(next){
      status += 1
    } else{
      status -= 1
    }

    let item: TaskDeskModel = {
      id: this.task.id,
      desk_id: this.task.desk_id,
      task_name: this.task.task_name,
      description: this.task.description,
      creator_id: this.task.creator_id,
      status_id: status,
      creation_date: this.task.creation_date,
      deadline: this.task.deadline,
      users_list: this.task.users_list
    }
    
    this.service.udateData(item).subscribe()
    this.task = item
    window.location.reload()
  }

  delTask(){
    this.service.delData(this.task.id).subscribe()
    window.location.reload()
  }

  editTask(){
    this.isModalOpen = true;
    // this.modal.open()
  }

  closeModal(isValid: boolean){
    this.isModalOpen = false;
  }
  // reloadTask(isValid: boolean){
  //   console.log(isValid);
    
  //   if(isValid)
  //     window.location.reload() 
  // }
}
