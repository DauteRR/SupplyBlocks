import BusinessIcon from '@material-ui/icons/Business';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import React from 'react';
import Dashboard from '../views/Dashboard';
import CompaniesView from '../views/Dashboard/Companies';
import DeliveriesView from '../views/Dashboard/Deliveries';
import ProductsView from '../views/Dashboard/Products';
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
    view: <CompaniesView />,
    icon: <BusinessIcon />
  },
  products: {
    label: 'Products',
    exact: true,
    path: '/dashboard/products',
    view: <ProductsView />,
    icon: <ShoppingBasketIcon />
  },
  deliveries: {
    label: 'Deliveries',
    exact: true,
    path: '/dashboard/deliveries',
    view: <DeliveriesView />,
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
