import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { routes } from 'routes';

import * as userSelectors from 'resources/user/user.selectors';

/* eslint-disable react/destructuring-assignment, react/jsx-props-no-spreading */
export function SafeRoute(props) {
  const authenticated = useSelector(userSelectors.getAuthenticated);

  if (!props.private && authenticated) {
    return (
      <Redirect
        to={routes.home.url()}
      />
    );
  }

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
