import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom';

const MenuLink = ({ path, exact, icon, label, onClick }) => (
  <ListItem
    button
    component={NavLink}
    to={path}
    exact={exact}
    activeClassName="Mui-selected"
    onClick={onClick}
  >
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    <ListItemText primary={label} />
  </ListItem>
);

export default function MenuContent(props) {
  return (
    <List component="nav" aria-label="drawer menu content">
      <MenuLink
        path="/"
        exact
        icon={<Home />}
        label="Home page"
        onClick={props.onMenuItemClick}
      />
    </List>
  );
}
