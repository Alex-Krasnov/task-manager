import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from './../_interfaces/authenticated-response.model';
import { LoginModel } from './../_interfaces/login.model';
import { NgForm } from '@angular/forms';
import { environment } from '../environments/environment';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  invalidLogin: boolean = false;
  credentials: LoginModel = {username:'', password:''};
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login = ( form: NgForm) => {
    if (form.valid) {
      
      let hashPass = Md5.hashStr(this.credentials.password)
      for (let i = 0; i < 9; i++) {
        hashPass = Md5.hashStr(hashPass)
      }

      var formData = new FormData()
      formData.append('username', this.credentials.username)
      formData.append('password', hashPass)
      
      this.http.post<AuthenticatedResponse>(`${environment.apiUrl}/login`,formData, 
      { headers: new HttpHeaders({"Accept": "application/json"})})
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.access_token;
          const refreshToken = response.refresh_token;
          localStorage.setItem("jwt", token); 
          localStorage.setItem("refreshToken", refreshToken)
          this.invalidLogin = false;
          this.router.navigate(["main/home"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }
}
