// ALL APPLICATION ROUTES ARE DEFINED HERE
import LoginPage from '../components/LoginPage/LoginPage';
import LandingPage from '../components/LandingPage/LandingPage';
import UserPage from '../components/User/UserPage';
import EditUserPage from '../components/User/EditUser/EditUserPage';
import ChatPage from '../components/Chat/ChatPage';
import PeakPage from '../components/Peak/PeakPage';
import PeakListPage from '../components/Peak/PeakListPage';
import ExpeditionListPage from '../components/Expedition/ExpeditionListPage';
import CreateExpeditionPage from '../components/Expedition/CreateExpedition/CreateExpeditionPage';
import ExpeditionInvitesPage from '../components/ExpeditionInvites/ExpeditionInvitesPage';
import ExpeditionPage from '../components/Expedition/ExpeditionPage';

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
    path: '/expeditions/:id',
    exact: true,
    component: ExpeditionPage,
  },
  {
    path: '/invites',
    exact: true,
    component: ExpeditionInvitesPage,
  },
  {
    path: '/messages',
    exact: false,
    component: ChatPage,
  },
];

export const openRoutes = [
  {
    path: '/login',
    component: LoginPage,
  },
];
