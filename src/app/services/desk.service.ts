import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { DeskModel } from '../_interfaces/desk.model';

@Injectable({
  providedIn: 'root'
})
export class DeskService {

  url: string = environment.apiUrl;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<DeskModel>{
      return this.http.get<DeskModel>(`${this.url}/desk/${id}`);
  };

  udateData(item: DeskModel){
    return this.http.put<DeskModel>(`${this.url}/desk/${item.id}`,{
      id: item.id,
      desk_name: item.desk_name,
      invite_code: item.invite_code,
      admin_id: item.admin_id,
      description: item.description,
      tasks_list: item.tasks_list
    });
  };

  delData(id: number): Observable<DeskModel>{
    return this.http.delete<DeskModel>(`${this.url}/desk/${id}`);
  };

  createData(item: DeskModel){
    return this.http.post<DeskModel>(`${this.url}/desk/create`,{
      // id: item.id,
      desk_name: item.desk_name,
      invite_code: item.invite_code,
      admin_id: item.admin_id,
      description: item.description//,
      // tasks_list: item.tasks_list
    });
  };
}
