import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { TaskDeskModel } from '../_interfaces/task-desk.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url: string = environment.apiUrl;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<TaskDeskModel>{
    return this.http.get<TaskDeskModel>(`${this.url}/task/${id}`);
  };

  udateData(item: TaskDeskModel){
    return this.http.put<TaskDeskModel>(`${this.url}/task/${item.id}`,{
      id: item.id,
      desk_id: item.desk_id,
      task_name: item.task_name,
      description: item.description,
      creator_id: item.creator_id,
      status_id: item.status_id,
      creation_date: item.creation_date,
      deadline: item.deadline,
      users_list: item.users_list
    });
  };

  delData(id: number): Observable<TaskDeskModel>{
    return this.http.delete<TaskDeskModel>(`${this.url}/task/${id}`);
  };

  createData(item: TaskDeskModel){
    return this.http.post<TaskDeskModel>(`${this.url}/task/${item.id}`,{
      id: item.id,
      desk_id: item.desk_id,
      task_name: item.task_name,
      description: item.description,
      creator_id: item.creator_id,
      status_id: item.status_id,
      creation_date: item.creation_date,
      deadline: item.deadline,
      users_list: item.users_list
    });
  };
}
