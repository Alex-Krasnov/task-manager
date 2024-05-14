import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HomeTasksModel } from '../_interfaces/home-tasks.model';
import { HomeDesksModel } from '../_interfaces/home-desks.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url: string = environment.apiUrl;
  constructor(private http: HttpClient){}

  getTasks(): Observable<any>{
      return this.http.get<HomeTasksModel>(`${this.url}/main_tasks`);
  };

  getDesks(): Observable<any>{
      return this.http.get<HomeDesksModel>(`${this.url}/main_desks`);
  };
}
