import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserModel } from '../_interfaces/user.model';
import { firstValueFrom } from 'rxjs';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-user-adm',
  templateUrl: './user-adm.component.html',
  styleUrls: ['./user-adm.component.css']
})
export class UserAdmComponent implements OnInit {

  users_list!: UserModel[];
  usersForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UserService
  ){}

  ngOnInit() {
    this.initForm()
  }

  async initForm(){
    this.users_list = await firstValueFrom(this.service.getAllDatta())

    this.usersForm = this.fb.group({
      newLogin: new FormControl(null,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      newPassword: new FormControl(null,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      newName: new FormControl(null,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      newRole: new FormControl(null,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      userLists: this.fb.array(
        this.users_list.map(item => this.createItemFormGroup(item))
      )
    })
    
    this.userLists.controls.forEach((control: AbstractControl, index: number) => {
      control.statusChanges.subscribe(value => {
        this.updateUser(index)
      });
    });
  }

  get userLists(): FormArray {
    return this.usersForm.get('userLists') as FormArray;
  }

  createItemFormGroup(item: UserModel): FormGroup {
    return this.fb.group({
      login: new FormControl(item.login,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      password: new FormControl(null, { updateOn: 'blur' }),
      name: new FormControl(item.name,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      role: new FormControl(item.role,{
        validators: [Validators.required],
        updateOn: 'blur'
      })
    });
  }

  async createUser(){
    if(!(this.usersForm.get('newPassword')?.valid && this.usersForm.get('newLogin')?.valid && 
        this.usersForm.get('newName')?.valid && this.usersForm.get('newRole')?.valid))
      return
    
    let hashPass = Md5.hashStr(this.usersForm.get('newPassword')?.value)
    for (let i = 0; i < 9; i++) {
      hashPass = Md5.hashStr(hashPass)
    }
    
    let item: UserModel = {
      id: 0,
      login: this.usersForm.get('newLogin')?.value,
      password: hashPass,
      name: this.usersForm.get('newName')?.value,
      role: this.usersForm.get('newRole')?.value
    }
    await firstValueFrom(this.service.createData(item))

    window.location.reload()
  }

  delUser(ind:number){
    let item = this.users_list.at(ind)

    if(item?.id == null || item?.id == undefined)
      return

    this.service.delData(item.id).subscribe();
    this.users_list.splice(ind, 1)
    this.userLists.removeAt(ind);
  }

  async updateUser(ind: number){
    let group = this.userLists.at(ind)
    if(!(group.get('login')?.valid && group.get('name')?.valid && group.get('role')?.valid ))
      return

    let hashPass: string | null = null
  
    if(group.get('password')?.value != null && group.get('password')?.value.length != 0){
      hashPass = Md5.hashStr(group.get('password')?.value)
      for (let i = 0; i < 9; i++) {
        hashPass = Md5.hashStr(hashPass)
      }
    }
    
    let item: UserModel = {
      id: this.users_list[ind].id,
      login: group.get('login')?.value,
      password: hashPass ?? null,
      name: group.get('name')?.value,
      role: group.get('role')?.value
    }
    console.log(item);
    
    await firstValueFrom(this.service.updateData(item))

    window.location.reload()
  }
}
