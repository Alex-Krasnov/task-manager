import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  
  constructor(
    private jwtHelper: JwtHelperService,
    public modal: ModalService
    ){  }
  ngOnInit(): void {

    let a = localStorage.getItem("jwt")
    if(a){
      console.log(this.jwtHelper.decodeToken(a));
      console.log(this.jwtHelper.getTokenExpirationDate(a));
    }
  }

}
