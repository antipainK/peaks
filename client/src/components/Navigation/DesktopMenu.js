import React from 'react';
import { Divider, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuContent from './MenuContent';
import { LEFT_MENU_WIDTH } from '../../utils/const';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: LEFT_MENU_WIDTH,
  },
}));

export default function DesktopMenu() {
  const classes = useStyles();

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
      open
    >
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <MenuContent />
      </div>
    </Drawer>
  );
}
