import { TaskDeskModel } from "./task-desk.model";

export interface DeskModel {
  id: number;
  desk_name: string;
  invite_code: string;
  admin_id: number;
  description: string;
  tasks_list: TaskDeskModel[];
}