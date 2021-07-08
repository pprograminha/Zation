import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/tasks', tasksRouter);

export default router;
