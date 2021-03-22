import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { protectedRoutes, profileRoute } from '../../routes/routes';

export default function MenuContent() {
  // filter out the user profile link since it's displayed on app bar
  const routes = protectedRoutes.filter(
    (route) => route.path !== profileRoute.path
  );
  return (
    <List component="nav" aria-label="drawer menu content">
      {routes.map((route) => (
        <ListItem
          key={route.path}
          button
          component={NavLink}
          to={route.path}
          exact={route.exact}
          activeClassName="Mui-selected"
        >
          {route.menuIcon && <ListItemIcon>{route.menuIcon}</ListItemIcon>}
          <ListItemText primary={route.menuLabel} />
        </ListItem>
      ))}
    </List>
  );
}
