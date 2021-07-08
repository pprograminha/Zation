import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, firstname, lastname, password } = <User>request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      firstname,
      lastname,
      password,
    });

    const userWithoutPassword = {
      ...user,
      password: undefined,
    };
    return response.status(201).json(userWithoutPassword);
  }
}
