// ALL APPLICATION ROUTES ARE DEFINED HERE
import LoginPage from '../components/LoginPage/LoginPage';
import LandingPage from '../components/LandingPage/LandingPage';

export const protectedRoutes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: '/profile',
    exact: true,
    component: () => <div></div>, // TO DO: replace with user profile view
  },
];

export const openRoutes = [
  {
    path: '/login',
    component: LoginPage,
  },
];
