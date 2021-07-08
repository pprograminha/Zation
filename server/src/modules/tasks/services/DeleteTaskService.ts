import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ITasksRepository from '../repositories/ITasksRepository';

@injectable()
export default class DeleteTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(task_id: string): Promise<void> {
    const task = await this.tasksRepository.findById(task_id);

    if (!task)
      throw new AppError(
        `it's not possible to delete a task that does not exist.`,
      );

    await this.tasksRepository.delete(task_id);
  }
}
