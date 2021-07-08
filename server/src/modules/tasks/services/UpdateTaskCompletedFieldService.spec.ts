import AppError from '@shared/errors/AppError';
import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';
import UpdateTaskCompletedFieldService from './UpdateTaskCompletedFieldService';

let fakeTasksRepository: FakeTasksRepository;

let updateTaskCompletedField: UpdateTaskCompletedFieldService;

describe('CreateTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    updateTaskCompletedField = new UpdateTaskCompletedFieldService(
      fakeTasksRepository,
    );
  });
  it('should be able to update a task field from incompleted to completed', async () => {
    const task = await fakeTasksRepository.create({
      user_id: 'user-id',
      title: 'Xxxx Xxxxx',
      description: 'xxxxxxx xxxxx xxxx xxxxxxxx',
    });
    const updatedTask = await updateTaskCompletedField.execute(task.id);

    expect(updatedTask.completed).toBe(true);
  });
  it('should not be able to update a task field from incompleted to completed with the non-existent task', async () => {
    await expect(
      updateTaskCompletedField.execute('non-existing-task'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
