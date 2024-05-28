import { UserTaskModel } from "./user-task.model";

export interface TaskDeskModel {
  id: number;
  desk_id: number;
  task_name: string;
  description: string;
  creator_id: number;
  status_id: number;
  creation_date: Date;
  deadline: Date;
  users_list: UserTaskModel[];
}