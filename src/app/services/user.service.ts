import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UserModel } from '../_interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.apiUrl;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.url}/user/${id}`);
  };

  getAllDatta(){
    return this.http.get<UserModel[]>(`${this.url}/all_users`);
  };

  updateData(item: UserModel){
    return this.http.put<UserModel>(`${this.url}/user/${item.id}`,{
      password: item.password,
      name: item.name,
      role: item.role
    });
  };

  delData(id: number): Observable<string>{
    return this.http.delete<string>(`${this.url}/user/${id}`);
  };

  createData(item: UserModel){
    return this.http.post<UserModel>(`${this.url}/user/create`,{
      login: item.login,
      password: item.password,
      name: item.name,
      role: item.role
    });
  };
}
