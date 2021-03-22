import React from 'react';
import { Link, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { profileRoute, homeRoute } from '../../routes/routes';

const useStyles = makeStyles(() => ({
  headerNav: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default function HeaderNavigation() {
  const classes = useStyles();
  return (
    <nav className={classes.headerNav} aria-label="app header navigation">
      <Link
        color="inherit"
        underline="none"
        component={RouterLink}
        to={homeRoute.path}
      >
        <Logo variant="h5" />
      </Link>
      <IconButton
        aria-label="account of current user"
        color="inherit"
        component={RouterLink}
        to={profileRoute.path}
      >
        {profileRoute.menuIcon}
      </IconButton>
    </nav>
  );
}
