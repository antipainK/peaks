// ALL APPLICATION ROUTES ARE DEFINED HERE
import LoginPage from '../components/LoginPage/LoginPage';
import LandingPage from '../components/LandingPage/LandingPage';
import UserPage from '../components/User/UserPage';
import EditUserPage from '../components/User/EditUser/EditUserPage';
import Chat from '../components/Chat/Chat';
import PeakPage from '../components/Peak/PeakPage';
import PeakListPage from '../components/Peak/PeakListPage';
import ExpeditionListPage from '../components/Expeditions/ExpeditionListPage';
import CreateExpeditionPage from '../components/Expeditions/CreateExpedition/CreateExpeditionPage';
import ExpeditionInvitesPage from '../components/ExpeditionInvites/ExpeditionInvitesPage';

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
    component: EditUserPage,
  },
  {
    path: '/peaks',
    exact: true,
    component: PeakListPage,
  },
  {
    path: '/peaks/:id',
    exact: true,
    component: PeakPage,
  },
  {
    path: '/expeditions',
    exact: true,
    component: ExpeditionListPage,
  },
  {
    path: '/expeditions/create',
    exact: true,
    component: CreateExpeditionPage,
  },
  {
    path: '/invites',
    exact: true,
    component: ExpeditionInvitesPage,
  },
  {
    path: '/messages',
    exact: false,
    component: Chat,
  },
];

export const openRoutes = [
  {
    path: '/login',
    component: LoginPage,
  },
];
