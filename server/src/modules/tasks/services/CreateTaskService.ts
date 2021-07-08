import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { Task } from '../infra/typeorm/entities/Task';
import ITasksRepository from '../repositories/ITasksRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import ICreateTaskServiceDTO from '../dtos/ICreateTaskServiceDTO';

@injectable()
export default class CreateTaskService {
  constructor(
    @inject('UsersRepository')
    private usersRespository: IUsersRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({
    user_id,
    title,
    description,
  }: ICreateTaskServiceDTO): Promise<Task> {
    const user = await this.usersRespository.findById(user_id);

    if (!user) throw new AppError('User does not exist.');

    const defaultTitle = '(undefined)';

    const task = await this.tasksRepository.create({
      title: title?.trim() || defaultTitle,
      description,
      user_id,
    });
    return task;
  }
}
