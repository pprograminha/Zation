import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeTokenProvider: FakeTokenProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });
  it('should be able to authenticate the user', async () => {
    await fakeUsersRepository.create({
      email: 'xxx@xxx.xxx',
      firstname: 'Xxxx',
      lastname: 'Xxx',
      password: 'xxxxxxx',
    });

    const { user } = await authenticateUser.execute({
      email: 'xxx@xxx.xxx',
      password: 'xxxxxxx',
    });

    expect(user.firstname).toBe('Xxxx');
  });

  it('should not be able to authenticate with a non-existent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'xxx@xxx.xxx',
        password: 'xxxxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with the wrong password', async () => {
    await fakeUsersRepository.create({
      firstname: 'Xxx',
      lastname: 'Xxxxxx',
      email: 'xxx@xxx.xxx',
      password: 'xxxxxxx',
    });

    await expect(
      authenticateUser.execute({
        email: 'xxx@xxx.xxx',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
