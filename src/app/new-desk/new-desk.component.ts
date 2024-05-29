import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeskService } from '../services/desk.service';
import { ModalService } from '../services/modal.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DeskModel } from '../_interfaces/desk.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-desk',
  templateUrl: './new-desk.component.html',
  styleUrls: ['./new-desk.component.css']
})
export class NewDeskComponent  implements OnInit {
  desk!: DeskModel;

  deskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: DeskService,
    public modal: ModalService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ){}

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 32; i++) {

      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));

    }

    this.deskForm = this.fb.group({
      desk_name: new FormControl(null,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      invite_code: new FormControl(outString,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      description: new FormControl(null,{
        validators: [Validators.required],
        updateOn: 'blur'
      }),
    })
  }

  async create(){
    if(!this.deskForm.valid)
      return

    let token = localStorage.getItem("jwt")
      let decodedToken: any = null
      if(token){
        decodedToken = this.jwtHelper.decodeToken(token);
      }
    this.desk = {
      id: 0, 
      desk_name: this.deskForm.get('desk_name')?.value,
      invite_code: this.deskForm.get('desk_name')?.value,
      admin_id: decodedToken.user_id,
      description: this.deskForm.get('description')?.value,
      tasks_list: []
    }
    let id = await firstValueFrom(this.service.createData(this.desk))

    this.router.navigate(['main/desk/'+id])
    this.modal.close()
  }
}
