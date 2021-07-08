import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import ITokenProvider from '../models/ITokenProvider';

export default class JWTTokenProvider implements ITokenProvider {
  async signToken(subject: string): Promise<string> {
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject,
      expiresIn,
    });

    return token;
  }
}
