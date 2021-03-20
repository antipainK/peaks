import React from 'react';
import { AppBar, Toolbar, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

const useStyles = makeStyles(() => ({
  logoContainer: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        {/* TO DO: change to react-router link */}
        <div className={classes.logoContainer}>
          <Link color="inherit" underline="none" href="/">
            <Logo variant="h5" />
          </Link>
        </div>
        <Navigation />
      </Toolbar>
    </AppBar>
  );
}
