import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  
  constructor(
    private jwtHelper: JwtHelperService,
    public modal: ModalService,
    private service:  UserService,
    private router: Router
    ){  }
  ngOnInit(): void {

    let a = localStorage.getItem("jwt")
    if(a){
      console.log(this.jwtHelper.decodeToken(a));
      console.log(this.jwtHelper.getTokenExpirationDate(a));
    }
  }

  async logout(){
    await firstValueFrom(this.service.logOut())
    this.router.navigate(['/'])
  }

}
