import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './private.routes';

const Routes: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={SignIn} exact />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
