import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const autheticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await autheticateUser.execute({
      email,
      password,
    });

    const userWithoutPassword = {
      ...user,
      password: undefined,
    };

    return response.status(200).json({
      user: userWithoutPassword,
      token,
    });
  }
}
