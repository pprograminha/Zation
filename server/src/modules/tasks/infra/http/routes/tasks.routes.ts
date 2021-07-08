import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import TasksController from '../controllers/TasksController';
import TasksCompletedController from '../controllers/TasksCompletedController';

const tasksRouter = Router();

const tasksController = new TasksController();
const tasksCompletedController = new TasksCompletedController();

tasksRouter.use(ensureAuthenticate);

tasksRouter.post('/', tasksController.create);
tasksRouter.delete('/:id', tasksController.delete);
tasksRouter.get('/', tasksCompletedController.index);

tasksRouter.patch('/:id', tasksCompletedController.update);

export default tasksRouter;
