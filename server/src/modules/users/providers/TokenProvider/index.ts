import { container } from 'tsyringe';
import JWTTokenProvider from './implementations/JWTTokenProvider';
import ITokenProvider from './models/ITokenProvider';

const providers = {
  jwt: JWTTokenProvider,
};
container.registerSingleton<ITokenProvider>('TokenProvider', providers.jwt);
