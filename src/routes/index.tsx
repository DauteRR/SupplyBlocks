import React from 'react';
import { RegisterEntity } from '../components/RegisterEntity';
import Welcome from '../components/Welcome';

export interface Route {
  path: string;
  component: JSX.Element;
  exact: boolean;
}

export const ApplicationRoutes: Route[] = [
  {
    path: '/register',
    component: <RegisterEntity />,
    exact: true
  },
  {
    path: '/',
    component: <Welcome />,
    exact: true
  }
];
