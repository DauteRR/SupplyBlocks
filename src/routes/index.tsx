import React from 'react';
import { SignUpView } from '../views/SignUp';
import { WelcomeView } from '../views/Welcome';
import Dashboard from '../views/Dashboard';
import { Typography } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import BusinessIcon from '@material-ui/icons/Business';

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

export interface ExtendedRoute extends Route {
  icon: JSX.Element;
  label: string;
}

export interface DashboardRoutes {
  [key: string]: ExtendedRoute;
  products: ExtendedRoute;
  deliveries: ExtendedRoute;
  companies: ExtendedRoute;
}

export const DashboardRoutes: DashboardRoutes = {
  companies: {
    label: 'Companies',
    exact: true,
    path: '/dashboard/companies',
    view: <Typography>Companies</Typography>,
    icon: <BusinessIcon />
  },
  products: {
    label: 'Products',
    exact: true,
    path: '/dashboard/products',
    view: <Typography>Products</Typography>,
    icon: <ShoppingBasketIcon />
  },
  deliveries: {
    label: 'Deliveries',
    exact: true,
    path: '/dashboard/deliveries',
    view: <Typography>Deliveries</Typography>,
    icon: <GpsFixedIcon />
  }
};

export const ApplicationRoutes: Routes = {
  signUp: {
    path: '/sign-up',
    view: <SignUpView />,
    exact: true
  },
  dashboard: {
    path: '/dashboard',
    view: <Dashboard />,
    exact: false
  },
  welcome: {
    path: '/',
    view: <WelcomeView />,
    exact: false
  }
};
