// ALL APPLICATION ROUTES ARE DEFINED HERE
import LoginPage from '../components/LoginPage/LoginPage';
import LandingPage from '../components/LandingPage/LandingPage';
import UserPage from '../components/User/UserPage';
import EditUser from '../components/User/EditUser/EditUser';

export const protectedRoutes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: '/profile',
    exact: true,
    component: UserPage,
  },
  {
    path: '/profile/edit',
    exact: true,
    component: EditUser,
  },
];

export const openRoutes = [
  {
    path: '/login',
    component: LoginPage,
  },
];
