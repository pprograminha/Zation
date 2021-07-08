import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreateUserServiceDTO from '../dtos/ICreateUserServiceDTO';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email,
    firstname,
    lastname,
    password,
  }: ICreateUserServiceDTO): Promise<User> {
    const checkIfUserAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );
    if (checkIfUserAlreadyExists)
      throw new AppError('User already exists.', 409);

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });

    return user;
  }
}
