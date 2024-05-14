import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  
  constructor(
    private jwtHelper: JwtHelperService
    ){  }
  ngOnInit(): void {

    let a = localStorage.getItem("jwt")
    if(a){
      console.log(this.jwtHelper.decodeToken(a));
      console.log(this.jwtHelper.getTokenExpirationDate(a));
    }
  }

}
