import React from 'react';
import { SignUpView } from '../views/SignUp';
import { WelcomeView } from '../views/Welcome';
import Dashboard from '../views/Dashboard';

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
  dashboard: {
    path: '/dashboard',
    view: <Dashboard />,
    exact: true
  },
  welcome: {
    path: '/',
    view: <WelcomeView />,
    exact: false
  }
};
