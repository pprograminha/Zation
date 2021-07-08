import '../../modules/users/providers';
import { container } from 'tsyringe';
import TasksRepository from '../../modules/tasks/infra/typeorm/repositories/TasksRepository';
import ITasksRepository from '../../modules/tasks/repositories/ITasksRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository,
);
