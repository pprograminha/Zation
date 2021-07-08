import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import ListUserTasksCompletedService from './ListUserTasksCompletedService';

let fakeTasksRepository: FakeTasksRepository;
let fakeUsersRepository: FakeUsersRepository;
let listUserTasksCompleted: ListUserTasksCompletedService;

describe('ListUserTasksCompleted', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listUserTasksCompleted = new ListUserTasksCompletedService(
      fakeTasksRepository,
    );
  });
  it(`should be able to list all of the user's completed tasks`, async () => {
    const user = await fakeUsersRepository.create({
      email: 'xxxx@xxxx.xxx',
      firstname: 'Xxxx',
      lastname: 'Xxxx',
      password: 'xxxxxxxxx',
    });
    const primaryTask = await fakeTasksRepository.create({
      user_id: user.id,
      title: 'Xxxx Xxxxx',
      description: 'xxxxxxx xxxxx xxxx xxxxxxxx',
    });

    primaryTask.completed = true;

    await fakeTasksRepository.save(primaryTask);

    const secondaryTask = await fakeTasksRepository.create({
      user_id: user.id,
      title: 'Xxxx Xxxxx',
      description: 'xxxxxxx xxxxx xxxx xxxxxxxx',
    });

    secondaryTask.completed = true;

    await fakeTasksRepository.save(primaryTask);

    const { data } = await listUserTasksCompleted.execute(user.id);

    expect(data).toEqual([primaryTask, secondaryTask]);
  });
});
