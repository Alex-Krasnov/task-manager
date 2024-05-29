import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskDeskModel } from '../_interfaces/task-desk.model';
import { TaskService } from '../services/task.service';
import { ModalService } from '../services/modal.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserTaskModel } from '../_interfaces/user-task.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {
  @Input() task!: TaskDeskModel | null;
  @Input() desk_id!: number | null;
  @Output() reload = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<boolean>();
  isCreate: boolean = false;

  taskForm!: FormGroup;
  listUsr!: UserTaskModel[];

  constructor(
    private fb: FormBuilder,
    private service: TaskService,
    public modal: ModalService,
    private jwtHelper: JwtHelperService
  ){}

  ngOnInit() {    
    this.reload.emit(false);
    this.initForm()
    this.service.getUsrList().subscribe(item => this.listUsr = item)
  }

  initForm(){
    if(!this.task){
      
      let token = localStorage.getItem("jwt")
      let decodedToken: any = null
      if(token){
        decodedToken = this.jwtHelper.decodeToken(token);
      }

      this.task = {
        id: 0,
        desk_id: this.desk_id ?? 0,
        task_name: '',
        description: '',
        creator_id: decodedToken.user_id,
        status_id: 1,
        creation_date: new Date(),
        deadline: new Date(),
        users_list: []
      };
      this.isCreate = true
    }

    this.taskForm = this.fb.group({
      id: new FormControl(this.task.id, { updateOn: 'blur' }),
      desk_id: new FormControl(this.task.desk_id, { updateOn: 'blur' }),
      task_name: new FormControl(this.task.task_name,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      description: new FormControl(this.task.description,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      creator_id: new FormControl(this.task.creator_id, { updateOn: 'blur' }),
      status_id: new FormControl(this.task.status_id, { updateOn: 'blur' }),
      creation_date: new FormControl(this.task.creation_date,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      deadline: new FormControl(this.task.deadline, { updateOn: 'blur' }),
      newName: new FormControl(null, { updateOn: 'blur' }),
      userList: this.fb.array(
        this.task.users_list.map(item => this.createItemFormGroup(item))
      )
    })


    this.taskForm.get('newName')?.valueChanges.subscribe(item => {
      if(item != null)
        this.addUser(item)
    })

    this.userList.controls.forEach((control: AbstractControl, index: number) => {
      control.valueChanges.subscribe(value => {
        this.updUsr(index)
      });
    });
  }

  createItemFormGroup(item: UserTaskModel): FormGroup {
    return this.fb.group({
      id: new FormControl(item.id, { updateOn: 'blur' }),
      name: new FormControl(item.name, { updateOn: 'blur' })
    });
  }

  get userList(): FormArray {
    return this.taskForm.get('userList') as FormArray;
  }

  addUser(name: string): void{
    var user = this.listUsr.find(item => item.name === name)
    
    if(!user){
      console.log('undefined user')
      this.taskForm.get('newName')?.setValue(null)
      return
    }
    
    this.userList.push(this.createItemFormGroup(user))
    this.task?.users_list.push(user)
    this.taskForm.get('newName')?.setValue(null)
  }

  updData(){
    if (this.task) {
      this.task.creation_date = this.taskForm.get('creation_date')?.value
      this.task.task_name = this.taskForm.get('task_name')?.value
      this.task.description = this.taskForm.get('description')?.value
      this.task.status_id = this.taskForm.get('status_id')?.value
      this.task.creation_date = this.taskForm.get('creation_date')?.value
      this.task.deadline = this.taskForm.get('deadline')?.value
    }
  }

  updUsr(ind: number):void{
    let userName = this.userList.at(ind).value.name

    if(userName == null){
      this.delUsr(ind)
      return
    }

    var user = this.listUsr.find(item => item.name === userName)
    if(!user){
      console.log('undefined user')
      this.userList.at(ind).get('name')?.setValue(null)
      return
    }

    if (this.task)
      this.task.users_list[ind] = user 
    return
  }

  delUsr(ind: number){
    if (this.task)
      this.task.users_list.splice(ind, 1);
    this.userList.removeAt(ind);
  }

  async saveExit(){
    
    if(this.isCreate){
      this.updData()
      if (this.task)
        await firstValueFrom(this.service.createData(this.task))
      this.reload.emit(true)
      this.close.emit(true)
      this.modal.close()
      return
    }

    this.updData()
    if (this.task)
      this.service.udateData(this.task).subscribe()
    
    this.close.emit(true)
    this.reload.emit(true)
    this.modal.close()
    return
  }
}
