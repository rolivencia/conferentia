// Models
import { ConferentiaRoute } from '@conferentia/models';

export const ROUTE_TREE = {
  HOME: 'home',
  USER_PROFILE: 'profile',
};

export const libRoutes: ConferentiaRoute[] = [
  {
    path: ROUTE_TREE.USER_PROFILE,
    loadChildren: () =>
      import('./lib/user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule
      ),
    data: {
      title: 'User Profile',
      url: ROUTE_TREE.USER_PROFILE,
      icon: '',
    },
  },
];
