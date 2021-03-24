import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { DrawerNavigation, HeaderNavigation } from '../Navigation';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <DrawerNavigation />
        <HeaderNavigation />
      </Toolbar>
    </AppBar>
  );
}
