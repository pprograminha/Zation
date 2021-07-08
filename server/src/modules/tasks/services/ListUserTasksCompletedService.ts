import { inject, injectable } from 'tsyringe';
import { Task } from '../infra/typeorm/entities/Task';
import ITasksRepository from '../repositories/ITasksRepository';

interface IResponse {
  score: number;
  data: Task[];
}
@injectable()
export default class ListUserTasksCompletedService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(user_id: string): Promise<IResponse> {
    const tasks = await this.tasksRepository.findAllTasksFromUser(user_id);
    const tasksCompleted = await this.tasksRepository.findAllCompletedTasksFromUser(
      {
        completed: true,
        user_id,
      },
    );

    const score = tasksCompleted.length * 5;

    return {
      score,
      data: tasks,
    };
  }
}
