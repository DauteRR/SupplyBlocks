import React from 'react';
import { SignUp } from '../components/SignUp';
import Welcome from '../components/Welcome';

export interface Route {
  path: string;
  component: JSX.Element;
  exact: boolean;
}

export const ApplicationRoutes: Route[] = [
  {
    path: '/sign-up',
    component: <SignUp />,
    exact: true
  },
  {
    path: '/',
    component: <Welcome />,
    exact: true
  }
];
