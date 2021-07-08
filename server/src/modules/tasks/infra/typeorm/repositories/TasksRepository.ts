import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import IFindAllCompletedTasksFromUserDTO from '@modules/tasks/dtos/IFindAllCompletedTasksFromUserDTO';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import { getRepository, Repository } from 'typeorm';
import { Task } from '../entities/Task';

export default class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  async save(task: Task): Promise<Task> {
    return this.ormRepository.save(task);
  }

  async create({ user_id, description, title }: ICreateTaskDTO): Promise<Task> {
    const task = this.ormRepository.create({
      user_id,
      description,
      title,
    });

    await this.ormRepository.save(task);

    return task;
  }

  async delete(task_id: string): Promise<void> {
    await this.ormRepository.delete(task_id);
  }

  async findById(task_id: string): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne(task_id);

    return task;
  }

  async findAllTasksFromUser(user_id: string): Promise<Task[]> {
    const tasks = await this.ormRepository.find({
      where: {
        user_id,
      },
    });
    return tasks;
  }

  async findAllCompletedTasksFromUser({
    user_id,
    completed,
  }: IFindAllCompletedTasksFromUserDTO): Promise<Task[]> {
    const tasks = await this.ormRepository.find({
      where: {
        user_id,
        completed,
      },
    });
    return tasks;
  }
}
