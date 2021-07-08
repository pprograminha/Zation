import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { Task } from '../infra/typeorm/entities/Task';
import ITasksRepository from '../repositories/ITasksRepository';

@injectable()
export default class UpdateTaskCompletedFieldService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(task_id: string): Promise<Task> {
    const task = await this.tasksRepository.findById(task_id);

    if (!task)
      throw new AppError(
        `it's not possible to update a task that does not exist.`,
        409,
      );

    task.completed = true;

    await this.tasksRepository.save(task);

    return task;
  }
}
