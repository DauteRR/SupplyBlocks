import React from 'react';
import { SignUpView } from '../views/SignUp';
import { WelcomeView } from '../views/Welcome';

export interface Route {
  path: string;
  view: JSX.Element;
  exact: boolean;
}

export interface Routes {
  [key: string]: Route;
  signUp: Route;
  welcome: Route;
  dashboard: Route;
}

export const ApplicationRoutes: Routes = {
  signUp: {
    path: '/sign-up',
    view: <SignUpView />,
    exact: true
  },
  welcome: {
    path: '/',
    view: <WelcomeView />,
    exact: false
  },
  dashboard: {
    path: '/dashboard',
    view: <p>TODO:</p>,
    exact: true
  }
};
