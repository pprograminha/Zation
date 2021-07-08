import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import DeleteTaskService from '@modules/tasks/services/DeleteTaskService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TasksController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const user_id = request.user.id;

    const createTask = container.resolve(CreateTaskService);

    const task = await createTask.execute({
      title,
      description,
      user_id,
    });
    return response.status(201).json(task);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTask = container.resolve(DeleteTaskService);

    await deleteTask.execute(id);

    return response.status(204).json();
  }
}
