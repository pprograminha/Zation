import { Task } from '../../infra/typeorm/entities/Task';
import ICreateTaskDTO from '../../dtos/ICreateTaskDTO';
import IFindAllCompletedTasksFromUserDTO from '../../dtos/IFindAllCompletedTasksFromUserDTO';
import ITasksRepository from '../ITasksRepository';

export default class FakeTasksRepository implements ITasksRepository {
  private tasks: Task[] = [];

  async save(task: Task): Promise<Task> {
    const findIndex = this.tasks.findIndex(findTask => findTask.id === task.id);

    this.tasks[findIndex] = task;

    return task;
  }

  async create(taskData: ICreateTaskDTO): Promise<Task> {
    const user = new Task();

    Object.assign(user, taskData);

    this.tasks.push(user);

    return user;
  }

  async delete(task_id: string): Promise<void> {
    const findIndex = this.tasks.findIndex(task => task.id === task_id);

    this.tasks.splice(findIndex, 1);
  }

  async findById(task_id: string): Promise<Task | undefined> {
    const task = this.tasks.find(findTask => findTask.id === task_id);

    return task;
  }

  async findAllTasksFromUser(user_id: string): Promise<Task[]> {
    const tasks = this.tasks.filter(task => task.user_id === user_id);
    return tasks;
  }

  async findAllCompletedTasksFromUser({
    user_id,
    completed,
  }: IFindAllCompletedTasksFromUserDTO): Promise<Task[]> {
    const tasks = this.tasks.filter(task => {
      return task.id === user_id && task.completed === completed;
    });
    return tasks;
  }
}
