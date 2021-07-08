import AppError from '@shared/errors/AppError';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import DeleteTaskService from './DeleteTaskService';

let fakeTasksRepository: FakeTasksRepository;

let deleteTask: DeleteTaskService;

describe('DeleteTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    deleteTask = new DeleteTaskService(fakeTasksRepository);
  });
  it('should be able to delete a task', async () => {
    const task = await fakeTasksRepository.create({
      user_id: 'user-id',
      title: 'Xxxx Xxxxx',
      description: 'xxxxxxx xxxxx xxxx xxxxxxxx',
    });

    const deleteMethod = jest.spyOn(fakeTasksRepository, 'delete');

    await deleteTask.execute(task.id);

    expect(deleteMethod).toHaveBeenCalledWith(task.id);
  });
  it('should not be able to delete with the non-existent task', async () => {
    await expect(
      deleteTask.execute('non-existing-task'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
