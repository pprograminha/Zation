import React, { ComponentType } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

interface FilteredRouteProps extends RouteProps {
  component: ComponentType;
}
const PrivateRoutes: React.FC<FilteredRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() =>
        true ? <Component /> : <Redirect to={{ pathname: '/signin' }} />
      }
    />
  );
};

export default PrivateRoutes;
