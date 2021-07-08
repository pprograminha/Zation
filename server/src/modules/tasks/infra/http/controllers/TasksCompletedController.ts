import ListUserTasksCompletedService from '@modules/tasks/services/ListUserTasksCompletedService';
import UpdateTaskCompletedFieldService from '@modules/tasks/services/UpdateTaskCompletedFieldService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TasksCompletedController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserTasksCompleted = container.resolve(
      ListUserTasksCompletedService,
    );

    const { score, data } = await listUserTasksCompleted.execute(user_id);

    return response.status(200).json({
      score,
      data,
    });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { task_id } = request.body;

    const updateTaskCompletedField = container.resolve(
      UpdateTaskCompletedFieldService,
    );

    const task = await updateTaskCompletedField.execute(task_id);

    return response.status(200).json(task);
  }
}
