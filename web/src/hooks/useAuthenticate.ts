import { useContext } from 'react';
import {
  AuthenticateContext,
  IAuthenticateContext,
} from '../contexts/AuthenticateContext';

export default function useAuthenticate(): IAuthenticateContext {
  const context = useContext(AuthenticateContext);

  if (!context)
    throw new Error(
      'useAuthenticate must be used within an AuthenticateProvider.',
    );

  return context;
}
