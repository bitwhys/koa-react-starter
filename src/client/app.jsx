import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import store from 'resources/store';
import history from 'services/history.service';

import Loading from 'components/loading';
import { SafeRoute } from 'components/safe-route';
import { ErrorBoundary } from 'components/error-boundary';

import { routes } from 'routes';
import SignIn from 'pages/sign-in';
import SignUp from 'pages/sign-up';
import Forgot from 'pages/forgot';
import Reset from 'pages/reset';
import Home from 'pages/home';
import NotFound from 'pages/not-found';

const Profile = React.lazy(() => import('./pages/profile'));

const pages = {
  [routes.signIn.name]: SignIn,
  [routes.signUp.name]: SignUp,
  [routes.forgot.name]: Forgot,
  [routes.reset.name]: Reset,
  [routes.home.name]: Home,
  [routes.profile.name]: Profile,
  [routes.notFound.name]: NotFound,
};

export function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ErrorBoundary fallback={<h1>Error!</h1>}>
          <React.Suspense fallback={<Loading />}>
            <Switch>
              {Object.values(routes).map((route) => (
                <SafeRoute
                  key={route.name}
                  private={route.private}
                  exact={route.exact}
                  path={route.path}
                  component={pages[route.name]}
                />
              ))}
              <Route path="*" component={NotFound} />
            </Switch>
          </React.Suspense>
        </ErrorBoundary>
      </ConnectedRouter>
    </Provider>
  );
}
