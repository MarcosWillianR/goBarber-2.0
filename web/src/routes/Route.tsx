import React from 'react';
import {
  Route as NativeRoute,
  RouteProps as NativeRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends NativeRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <NativeRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: user ? '/dashboard' : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
