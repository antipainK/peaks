import React, { useState } from 'react';
import { IconButton, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import { LEFT_MENU_WIDTH } from '../../utils/const';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: LEFT_MENU_WIDTH,
      flexShrink: 0,
    },
  },
}));

export default function DrawerNavigation() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open menu"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <div className={classes.drawer} aria-label="menu with links">
        <Hidden smUp>
          <MobileMenu isOpen={mobileOpen} onClose={handleDrawerToggle} />
        </Hidden>
        <Hidden xsDown>
          <DesktopMenu />
        </Hidden>
      </div>
    </>
  );
}
