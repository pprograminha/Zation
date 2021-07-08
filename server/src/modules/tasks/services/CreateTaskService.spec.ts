import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import CreateTaskService from './CreateTaskService';

let fakeUsersRepository: FakeUsersRepository;
let fakeTasksRepository: FakeTasksRepository;

let createTask: CreateTaskService;

describe('CreateTask', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTasksRepository = new FakeTasksRepository();

    createTask = new CreateTaskService(
      fakeUsersRepository,
      fakeTasksRepository,
    );
  });
  it('should be able to create a task', async () => {
    const user = await fakeUsersRepository.create({
      firstname: 'Xxx',
      lastname: 'Xxxxx',
      password: 'xxxxxxxxx',
      email: 'xxxx@xxx.xxx',
    });
    const task = await createTask.execute({
      user_id: user.id,
      title: 'Xxxx Xxxxx',
      description: 'xxxxxxx xxxxx xxxx xxxxxxxx',
    });
    expect(task.title).toBe('Xxxx Xxxxx');
    expect(task.description).toBe('xxxxxxx xxxxx xxxx xxxxxxxx');
  });

  it('should be able to create a task without the title', async () => {
    const user = await fakeUsersRepository.create({
      firstname: 'Xxx',
      lastname: 'Xxxxx',
      password: 'xxxxxxxxx',
      email: 'xxxx@xxx.xxx',
    });
    const task = await createTask.execute({
      user_id: user.id,
      description: 'xxxxxxx xxxxx xxxx xxxxxxxx',
    });
    expect(task.description).toBe('xxxxxxx xxxxx xxxx xxxxxxxx');
  });

  it('should not be able to create a task with a non-existent user', async () => {
    await expect(
      createTask.execute({
        user_id: 'non-existing-user',
        title: 'Xxxx Xxxxx',
        description: 'xxxxxxx xxxxx xxxx xxxxxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
