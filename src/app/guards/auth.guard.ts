import { AuthenticatedResponse } from './../_interfaces/authenticated-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private router:Router, private jwtHelper: JwtHelperService, private http: HttpClient){}
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem("jwt");
    if(!token)
      return false

    if (token && !this.jwtHelper.isTokenExpired(token))
      return true;
    
    console.log("try_refresh_token");
    const isRefreshSuccess = await this.tryRefreshingTokens(token); 
    console.log("end_try");

    if (!isRefreshSuccess) {
      console.log("unsuccessful refresh");
      this.router.navigate([""]);
    } else
      console.log("success refresh");
    
    return isRefreshSuccess;
  }
  
  private async tryRefreshingTokens(token: string): Promise<boolean> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!token || !refreshToken) { 
      return false;
    }
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
    let isRefreshSuccess: boolean;

    let headers_object  = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set('Authorization', `Bearer ${localStorage.getItem('refreshToken')}`)
    
    const refreshRes = await new Promise<AuthenticatedResponse>((resolve, reject) => {
      this.http.post<AuthenticatedResponse>(`${environment.apiUrl}/login/refresh_token`,{},{headers:headers_object })
      .subscribe({ 
        next: (res: AuthenticatedResponse) => resolve(res),
        error: (_) => { reject; isRefreshSuccess = false; this.router.navigate([""]);}
      });
    });
    localStorage.setItem("jwt", refreshRes.access_token);
    localStorage.setItem("refreshToken", refreshRes.refresh_token);
    isRefreshSuccess = true;
    return isRefreshSuccess;
  }
}