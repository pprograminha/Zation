import React from 'react';
import AuthenticateProvider from './AuthenticateContext';

const AppProvider: React.FC = ({ children }) => {
  return <AuthenticateProvider>{children}</AuthenticateProvider>;
};
export default AppProvider;
