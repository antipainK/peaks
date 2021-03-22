// ALL APPLICATION ROUTES ARE DEFINED HERE

import Home from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LoginPage from '../components/LoginPage/LoginPage';
import LandingPage from '../components/LandingPage/LandingPage';

export const homeRoute = {
  path: '/',
  exact: true,
  component: LandingPage,
  menuLabel: 'Home page',
  menuIcon: <Home />,
};

export const profileRoute = {
  path: '/profile',
  exact: true,
  component: () => <div></div>, // TO DO: replace with user profile view
  menuLabel: 'Profile',
  menuIcon: <AccountCircle />,
};

export const protectedRoutes = [homeRoute, profileRoute];

export const openRoutes = [
  {
    path: '/login',
    component: LoginPage,
  },
];
