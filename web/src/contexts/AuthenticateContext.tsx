import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
interface ISignInFormData {
  email: string;
  password: string;
}
export interface IAuthenticateContext {
  user: IUser;
  signIn: (credencials: ISignInFormData) => Promise<void>;
  signOut: () => void;
}
interface IResponse {
  user: IUser;
  token: string;
}
export const AuthenticateContext = createContext({} as IAuthenticateContext);

const AuthenticateProvider: React.FC = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(() => {
    const user = localStorage.getItem('@Zation:user');
    const token = localStorage.getItem('@Zation:token');

    if (user && token) {
      api.defaults.headers.authorization = `Bearer: ${token}`;

      return {
        user: JSON.parse(user),
        token,
      };
    }
    return {} as IResponse;
  });
  const signIn = useCallback(async ({ email, password }: ISignInFormData) => {
    const { data } = await api.post('/sessions', { email, password });
    const { user, token } = data as IResponse;

    api.defaults.headers.authorization = `Bearer: ${token}`;

    localStorage.setItem('@Zation:user', JSON.stringify(user));
    localStorage.setItem('@Zation:token', token);

    setIsAuthenticate({
      user,
      token,
    });
  }, []);
  const signOut = useCallback(() => {
    setIsAuthenticate({} as IResponse);

    localStorage.removeItem('@Zation:user');
    localStorage.removeItem('@Zation:token');

    api.defaults.headers.authorization = undefined;
  }, []);

  return (
    <AuthenticateContext.Provider
      value={{ user: isAuthenticate.user, signIn, signOut }}
    >
      {children}
    </AuthenticateContext.Provider>
  );
};

export default AuthenticateProvider;
