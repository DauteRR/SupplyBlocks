import React from 'react';
import { SignUpView } from '../views/SignUp';
import { WelcomeView } from '../views/Welcome';

export interface Route {
  path: string;
  view: JSX.Element;
  exact: boolean;
}

export const ApplicationRoutes: Route[] = [
  {
    path: '/sign-up',
    view: <SignUpView />,
    exact: true
  },
  {
    path: '/',
    view: <WelcomeView />,
    exact: true
  }
];
