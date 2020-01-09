import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { routes } from 'routes';

import * as userSelectors from 'resources/user/user.selectors';

export function SafeRoute(props) {
  const authenticated = useSelector(userSelectors.getAuthenticated);

  if (props.private && !authenticated) {
    const searchParams = new URLSearchParams({ to: window.location.pathname });
    return (
      <Redirect
        to={routes.signIn.url({
          search: searchParams.toString(),
        })}
      />
    );
  }

  return <Route {...props} />;
}

SafeRoute.propTypes = {
  private: PropTypes.bool.isRequired,
};
