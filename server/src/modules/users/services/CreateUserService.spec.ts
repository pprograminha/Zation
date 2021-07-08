import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create the user', async () => {
    const user = await createUser.execute({
      email: 'xxxx@xxxx.xxx',
      firstname: 'Xxxx',
      lastname: 'Xxxx',
      password: 'xxxxxxxxx',
    });
    expect(user.email).toBe('xxxx@xxxx.xxx');
    expect(user).toHaveProperty('firstname');
  });

  it(`should not be able to create the user with the another's email`, async () => {
    await createUser.execute({
      email: 'same-email',
      firstname: 'Xxxx',
      lastname: 'Xxxx',
      password: 'xxxxxxxxx',
    });

    await expect(
      createUser.execute({
        email: 'same-email',
        firstname: 'Xxxx',
        lastname: 'Xxxx',
        password: 'xxxxxxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
