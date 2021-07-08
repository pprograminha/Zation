import ITokenProvider from '../models/ITokenProvider';

export default class FakeTokenProvider implements ITokenProvider {
  async signToken(): Promise<string> {
    return 'This is a token.';
  }
}
