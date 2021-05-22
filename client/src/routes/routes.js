// ALL APPLICATION ROUTES ARE DEFINED HERE
import LoginPage from '../components/LoginPage/LoginPage';
import LandingPage from '../components/LandingPage/LandingPage';
import ProfilePage from '../components/User/ProfilePage';
import AnyUserPage from '../components/User/AnyUserPage';
import EditUserPage from '../components/User/EditUser/EditUserPage';
import UserListPage from '../components/User/UserListPage';
import ChatPage from '../components/Chat/ChatPage';
import PeakPage from '../components/Peak/PeakPage';
import PeakListPage from '../components/Peak/PeakListPage';
import ExpeditionListPage from '../components/Expedition/ExpeditionListPage';
import CreateExpeditionPage from '../components/Expedition/CreateExpedition/CreateExpeditionPage';
import ExpeditionInvitesPage from '../components/ExpeditionInvites/ExpeditionInvitesPage';
import ExpeditionPage from '../components/Expedition/ExpeditionPage';
import EditExpeditionPage from '../components/Expedition/EditExpedition/EditExpeditionPage';
import UploadPage from '../components/Upload/UploadPage';

export const protectedRoutes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: '/profile',
    exact: true,
    component: ProfilePage,
  },
  {
    path: '/profile/edit',
    exact: true,
    component: EditUserPage,
  },
  {
    path: '/users',
    exact: true,
    component: UserListPage,
  },
  {
    path: '/users/:id',
    exact: true,
    component: AnyUserPage,
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
    path: '/expeditions/:id/edit',
    exact: true,
    component: EditExpeditionPage,
  },
  {
    path: '/invites',
    exact: true,
    component: ExpeditionInvitesPage,
  },
  {
    path: '/tracks/:id/upload',
    exact: true,
    component: UploadPage,
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
