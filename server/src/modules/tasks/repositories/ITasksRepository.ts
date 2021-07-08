import { Task } from '../infra/typeorm/entities/Task';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import IFindAllCompletedTasksFromUserDTO from '../dtos/IFindAllCompletedTasksFromUserDTO';

export default interface ITasksRepository {
  save(task: Task): Promise<Task>;
  create(taskData: ICreateTaskDTO): Promise<Task>;
  delete(task_id: string): Promise<void>;
  findById(task_id: string): Promise<Task | undefined>;
  findAllTasksFromUser(user_id: string): Promise<Task[]>;
  findAllCompletedTasksFromUser(
    data: IFindAllCompletedTasksFromUserDTO,
  ): Promise<Task[]>;
}
